<?php

namespace App\Http\Controllers\Formulation;

use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\Formulation\Phase;
use App\Models\Formulation\Formula;
use App\Http\Controllers\Controller;
use App\Models\Inventory\Ingredient;
use App\Models\Formulation\PhaseIngredient;
use App\Http\Resources\Formulation\PhaseResource;
use App\Http\Resources\Formulation\FormulaResource;
use App\Http\Resources\Inventory\IngredientResource;
use App\Http\Requests\Formulation\Phase\CreatePhaseRequest;
use App\Http\Requests\Formulation\Phase\UpdatePhaseRequest;

class PhaseController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create(Tenant $tenant, Formula $formula)
    {
        $formula->load('categories');

        return Inertia::render('formulation/phases/create',[
            'formula' => new FormulaResource($formula)->resolve(),
            'ingredients' => IngredientResource::collection(Ingredient::all())->resolve()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePhaseRequest $request, Tenant $tenant, Formula $formula)
    {
        $this->authorize('create', $formula);
        
        $validated = $request->validated();
        
        foreach ($validated['phases'] as $phase) {
            $new_phase = Phase::create([
                'formula_id' => $formula->id,
                'name' => $phase['name']
            ]);
            foreach ($phase['ingredients'] as $ingredient) {
                PhaseIngredient::create([
                    'phase_id' => $new_phase->id,
                    'ingredient_id' => $ingredient['ingredient_id'],
                    'percentage_weight_per_weight' => $ingredient['percentage_weight_per_weight'],
                    'quantity_sufficient' => $ingredient['quantity_sufficient'],
                ]);
            }
        }

        $formula->version();
        $formula->publish();

        Controller::toast('Phases created successfully!', 'success');
        return redirect()->route('formulation.formulas.show', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant, Formula $formula)
    {   

        if($formula->phases()->count() === 0) {
            return redirect()->route('formulation.formula.phases.create', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
        }
        return Inertia::render('formulation/phases/edit',[
            'formula' => new FormulaResource($formula)->resolve(),
            'phases' => PhaseResource::collection($formula->phases)->resolve(),
            'ingredients' => IngredientResource::collection(Ingredient::all())->resolve()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePhaseRequest $request, Tenant $tenant, Formula $formula)
    {
        $this->authorize('update', $formula);

        $formula->phases()->delete();

        $validated = $request->validated();
        
        foreach ($validated['phases'] as $phase) {
            $new_phase = Phase::create([
                'formula_id' => $formula->id,
                'name' => $phase['name']
            ]);
            foreach ($phase['ingredients'] as $ingredient) {
                PhaseIngredient::create([
                    'phase_id' => $new_phase->id,
                    'ingredient_id' => $ingredient['ingredient_id'],
                    'percentage_weight_per_weight' => $ingredient['percentage_weight_per_weight'],
                    'quantity_sufficient' => $ingredient['quantity_sufficient'],
                ]);
            }
        }

        
        $formula->version();

        Controller::toast('Phases updated successfully!', 'success');
        return redirect()->route('formulation.formulas.show', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
    }
}
