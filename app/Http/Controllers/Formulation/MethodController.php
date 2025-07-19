<?php

namespace App\Http\Controllers\Formulation;

use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\Formulation\Method;
use App\Models\Formulation\Formula;
use App\Http\Controllers\Controller;
use App\Http\Resources\Formulation\PhaseResource;
use App\Http\Resources\Formulation\FormulaResource;
use App\Http\Requests\Formulation\Method\CreateMethodRequest;
use App\Http\Requests\Formulation\Method\UpdateMethodRequest;

class MethodController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create(Tenant $tenant, Formula $formula)
    {
        return Inertia::render('formulation/methods/create',[
            'formula' => new FormulaResource($formula)->resolve(),
            'phases' => PhaseResource::collection($formula->phases)->resolve()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateMethodRequest $request, Tenant $tenant, Formula $formula)
    {
        $this->authorize('create', $formula);

        $validated = $request->validated();

        foreach ($validated['methods'] as $method) {
            Method::create([
                'formula_id' => $formula->id,
                'step' => $method['step'],
                'instruction' => $method['instruction'],
            ]);
        }

        $formula->version();

        Controller::toast('Method created successfully!', 'success');
        return redirect()->route('formulation.formulas.show', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant, Formula $formula)
    {   
       
        return Inertia::render('formulation/methods/edit',[
            'formula' => new FormulaResource($formula)->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMethodRequest $request, Tenant $tenant, Formula $formula)
    {
        
        $this->authorize('update', $formula);

        $formula->methods()->delete();

        $validated = $request->validated();

        foreach ($validated['methods'] as $method) {
            Method::create([
                'formula_id' => $formula->id,
                'step' => $method['step'],
                'instruction' => $method['instruction'],
            ]);
        }

        
        $formula->version();

        Controller::toast('Phases updated successfully!', 'success');
        return redirect()->route('formulation.formulas.show', ['tenant' => $tenant->id, 'formula' => $formula->slug]);
    }
}
