<?php

namespace App\Http\Controllers\Inventory;

use App\Models\Tenant;
use App\Models\Inventory\Supplier;
use App\Http\Controllers\Controller;
use App\Http\Requests\Inventory\Supplier\CreateSupplierIngredientRequest;
use App\Http\Requests\Inventory\Supplier\DeleteSupplierIngrdientRequest;
use App\Http\Requests\Inventory\Supplier\UpdateSupplierIngredientRequest;
use App\Models\Inventory\Ingredient;

class SupplierIngredientController extends Controller
{
    public function store(CreateSupplierIngredientRequest $request, Tenant $tenant, Supplier $supplier)
    {
        $validated = $request->validated();

        $supplier->ingredients()->attach($validated['id'], [
            'url' => $validated['url'],
            'unit' => $validated['unit'],
            'cost_per_unit' => $validated['cost_per_unit'],
            'currency' => $validated['currency'],
        ]);

        Controller::toast('Ingredient successfully addred to supplier catalog!', 'success');
        return response(status: 200);
    }

    public function update(UpdateSupplierIngredientRequest $request, Tenant $tenant, Supplier $supplier, Ingredient $ingredient)
    {
        $validated = $request->validated();

        $supplier->ingredients()->updateExistingPivot($ingredient, [
            'url' => $validated['url'],
            'unit' => $validated['unit'],
            'cost_per_unit' => $validated['cost_per_unit'],
            'currency' => $validated['currency'],
        ],true);

        Controller::toast('Ingredient successfully updated!', 'success');
        return response(status: 200);        
    }

    public function destroy(DeleteSupplierIngrdientRequest $request, Tenant $tenant, Supplier $supplier, Ingredient $ingredient)
    {
        $supplier->ingredients()->detach($ingredient);
        Controller::toast('Ingredient successfully removed from supplier catalog!', 'success');
        return response(status: 200);
    }
}
