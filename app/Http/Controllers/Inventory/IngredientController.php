<?php

namespace App\Http\Controllers\Inventory;

use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Inventory\Ingredient;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\Inventory\SupplierResource;
use App\Http\Resources\Formulation\FormulaResource;
use App\Http\Resources\Inventory\IngredientResource;
use App\Http\Requests\Inventory\Ingredient\CreateIngredientRequest;
use App\Http\Requests\Inventory\Ingredient\UpdateIngredientRequest;

class IngredientController extends Controller
{
    protected $states = ['liquid', 'solid', 'gas', 'powder'];

    /**
     * Initializes the controller and applies authorization policies for the Ingredient model.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Ingredient::class);

    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('inventory/ingredients/index',[
            'ingredients' => IngredientResource::collection(Ingredient::with('suppliers')->get())->resolve(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('inventory/ingredients/create', [
            'categories' => CategoryResource::collection(Category::where('class', 'ingredient')->orderBy('name')->get())->resolve(),
            'states' => $this->states,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateIngredientRequest $request, Tenant $tenant)
    {
        $validated = $request->validated();
        $validated['created_by'] = Auth::user()->id;

        $ingredient = Ingredient::create($validated);

        Controller::toast('Ingrdient created successfully!', 'success');
        return redirect()->route('inventory.ingredients.show', ['tenant' => $tenant->id, 'ingredient' => $ingredient->slug]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant, Ingredient $ingredient)
    {
        $ingredient->load('suppliers'); 
        $ingredient->load('categories'); 

        return Inertia::render('inventory/ingredients/show',[
            'ingredient' => new IngredientResource($ingredient)->resolve(),
            'formulas' => FormulaResource::collection($ingredient->formulas)->resolve()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant, Ingredient $ingredient)
    {
        return Inertia::render('inventory/ingredients/edit',[
            'categories' => CategoryResource::collection(Category::where('class', 'ingredient')->orderBy('name')->get())->resolve(),
            'ingredient' => IngredientResource::make($ingredient)->resolve(),
            'states' => $this->states,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIngredientRequest $request, Tenant $tenant, Ingredient $ingredient)
    {
        $validated = $request->validated();
        
        $ingredient->update($validated);
        $ingredient->categories()->sync($validated['categories']);

        Controller::toast('Ingrdient created successfully!', 'success');

        return redirect()->route('inventory.ingredients.show', ['tenant' => $tenant->id, 'ingredient' => $ingredient->slug]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ingredient $ingredient)
    {
        $ingredient->suppliers()->detach();
        $ingredient->categories()->detach();
        $ingredient->tags()->detach();
        $ingredient->delete();
        
        Controller::toast('Ingredeint deleted successfully!', 'success');
        return response(status: 200);
    }

    public function restore(Ingredient $ingredient)
    {
        //
    }

    public function forceDelete(Ingredient $ingredient)
    {
        //
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
        ]);
    }
}
