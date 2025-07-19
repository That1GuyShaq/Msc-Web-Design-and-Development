<?php

namespace App\Http\Controllers\Formulation;

use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\Category;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Formulation\Formula;
use App\Http\Controllers\Controller;
use App\Models\Inventory\Ingredient;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\Formulation\PhaseResource;
use App\Http\Resources\Formulation\FormulaResource;
use App\Http\Resources\Formulation\PhaseIngredientResource;
use App\Http\Requests\Formulation\Formula\CreateFormulaRequest;
use App\Http\Requests\Formulation\Formula\UpdateFormulaRequest;

class FormulaController extends Controller
{
    protected $statuses = ['draft', 'published', 'archived'];
    
    /**
     * Initializes the controller and applies authorization policies for the Formula model.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Formula::class);

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('formulation/formulas/index',[
            'formulas' => FormulaResource::collection(Formula::all())->resolve(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('formulation/formulas/create',[
            'categories' => CategoryResource::collection(Category::where('class', 'formula')->orderBy('name')->get())->resolve(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateFormulaRequest $request, Tenant $tenant)
    {  
        $validated = $request->validated();
        $validated['created_by'] = Auth::user()->id;

        $formula = Formula::create($validated);
        
        if (!empty($validated['category'])) {
            $formula->categories()->sync($validated['category']);
        } else {
            $formula->categories()->detach(); 
        }
        
        if (! empty($validated['methods'])) {
            $formula->methods()->sync($validated['methods']);
        }
        if (! empty($validated['phases'])) {
            $formula->phases()->sync($validated['phases']);
        }
        if (! empty($validated['tags'])) {
            $formula->tags()->sync($validated['tags']);
        }

        Controller::toast('Formula created successfully!', 'success');
        return redirect()->route('formulation.formulas.show', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant, Formula $formula)
    {
        $formula->load([
            'categories',
            'phases.ingredients.ingredient'
        ]);

        return Inertia::render('formulation/formulas/show',[
            'formula' => new FormulaResource($formula)->resolve()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant, Formula $formula)
    {
        $formula->load('categories');
        
        return Inertia::render('formulation/formulas/edit',[
            'categories' => CategoryResource::collection(Category::where('class', 'formula')->orderBy('name')->get())->resolve(),
            'formula' => new FormulaResource($formula)->resolve(),
            'statuses' => $this->statuses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormulaRequest $request, Tenant $tenant,  Formula $formula)
    {
        $validated = $request->validated();

        $formula->update($validated);
        
        if (isset($validated['methods'])) {
            $formula->methods->sync($validated['methods']);
        }
        if (isset($validated['phases'])) {
            $formula->phases->sync($validated['phases']);
        }
        
        if (isset($validated['category'])) {
            $formula->categories()->detach(); 
            $formula->categories()->sync($validated['category']);
        } else {
            // If the category is being unselected/removed
            $formula->categories()->detach(); 
        }

        if (isset($validated['tags'])) {
            $formula->tags->sync($validated['tags']);
        }


        Controller::toast('Formula updated successfully!', 'success');
        return redirect()->route('formulation.formulas.show', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tenant $tenant, Formula $formula)
    {
        $formula->delete();
        
        Controller::toast('Formula deleted successfully!', 'success');
        return response(status: 200);
    }

    public function restore(Tenant $tenant, Formula $formula)
    {
        //
    }

    public function forceDelete(Tenant $tenant, Formula $formula)
    {
        
        $formula->methods()->detach();
        $formula->phases()->detach();
        
        if ($formula->category) {
            $formula->category->delete();
        }

        $formula->tags()->detach();

        $formula->forceDelete();
        
        Controller::toast('Formula deleted successfully!', 'success');
        return response(status: 200);
    }

    public function createEditNotes(Tenant $tenant, Formula $formula)
    {
        
        return Inertia::render('formulation/formulas/notes/edit',[
            'formula' => new FormulaResource($formula)->resolve(),
        ]);
    }

    public function updateNotes(Request $request, Tenant $tenant, Formula $formula)
    {
        $validated = $request->validate(['notes' => 'required', 'string', 'max:5000']);

        $formula->update(['notes' => $validated['notes']]);
        
        $formula->versionIncrement();

        Controller::toast('Formula notes updated successfully!', 'success');
        return redirect()->route('formulation.formulas.show', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
    }

    public function archive(Tenant $tenant, Formula $formula)
    {
        $formula->archive();
        
        return response()->noContent();
    }

    public function version(Tenant $tenant, Formula $formula)
    {
        $formula->load('phases.ingredients', 'methods', 'categories');

        try {
            DB::transaction(function() use ($formula) {
                // 1) clone the “clean” original
                $new_formula = $formula->replicate();
                $new_formula->version         = round($formula->version, 0, PHP_ROUND_HALF_DOWN) + 1.0;
                $new_formula->status          = 'draft';
                $new_formula->save();

                // 2) Deep-clone eachformula phase 
                foreach($formula->phases as $phase) {
                    $new_phase = $phase->replicate();

                    $new_phase->formula_id = $new_formula->id;
                    $new_phase->save();

                    // 2.1) cDeep-clone each phase ingredient
                    foreach ($phase->ingredients as $ingredient) {
                        $new_ingredient = $ingredient->replicate();
                        $new_ingredient->phase_id = $new_phase->id;
                        $new_ingredient->save();
                    }
                }

                // 3) Deep-clone each formula method
                foreach($formula->methods as $method) {
                    $new_method = $method->replicate();
                    $new_method->formula_id = $new_formula->id;
                    $new_method->save();
                }

                //4) Deep-clone each formula category
                $new_formula->categories()->sync($formula->categories->pluck('id')->all());

                // 5) archive the formula
                $formula->update([
                    'name'   => "{$formula->name} (v{$formula->version})",
                    'status' => 'archived',
                ]);
            });

            // 6) return a simple 204 No Content for axios
            return response()->noContent();

        } catch (\Throwable $e) {
            activity()->log('Formula versioning failed: ' . $e->getMessage());
            return response()->json(['error' => 'Versioning failed'], 500);
        }
    }

    /**
     * Get the map of resource methods to ability names.
     *
     * @return array
     */
    protected function resourceAbilityMap(): array
    {
        return array_merge(parent::resourceAbilityMap(), [
            'restore'     => 'restore',
            'forceDelete' => 'forceDelete',
            'updateNotes' => 'updateNotes',
            'archive'     => 'archive',
            'version'     => 'version',
        ]);
    }
}
