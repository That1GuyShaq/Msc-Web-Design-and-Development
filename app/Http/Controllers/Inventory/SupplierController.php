<?php

namespace App\Http\Controllers\Inventory;

use Inertia\Inertia;
use App\Models\Tenant;
use Illuminate\Support\Str;
use App\Models\Inventory\Supplier;
use App\Http\Controllers\Controller;
use App\Models\Inventory\Ingredient;
use App\Http\Resources\Inventory\SupplierResource;
use App\Http\Resources\Inventory\SupplierIngredientResources;
use App\Http\Requests\Inventory\Supplier\CreateSupplierRequest;
use App\Http\Requests\Inventory\Supplier\UpdateSupplierRequest;
use App\Http\Resources\Inventory\UnlistedIngredientResourcee;

class SupplierController extends Controller
{
    /**
     * SupplierController constructor.
     * 
     * Initializes the controller and applies authorization policies for the Supplier model.
     */
    public function __construct()
    {
        $this->authorizeResource(Supplier::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('inventory/suppliers/index',[
            'suppliers' => SupplierResource::collection(Supplier::all())->resolve(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('inventory/suppliers/create',[
            'countries' => $this->countries(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateSupplierRequest $request, Tenant $tenant)
    {
        $validated = $request->validated();

        $supplier = Supplier::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
            'state_province' => $validated['state_province'] ?? null,
            'country' => $validated['country'],
            'zip_postal_code' => $validated['zip_postal_code'] ?? null,
            'website' => $validated['website'],
            'description' => $validated['description'] ?? null,
            'notes' => $validated['notes'] ?? null
        ]);

        Controller::toast('Supplier created successfully!', 'success');
        return redirect()->route('inventory.suppliers.show', ['tenant' => $tenant->id, 'supplier' => $supplier->slug]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tenant $tenant, Supplier $supplier)
    {
        $unassociated_ingredients = Ingredient::whereDoesntHave('suppliers', function ($query) use ($supplier) { 
            $query->where('supplier_id', $supplier->id);
        })->get();
        
        return Inertia::render('inventory/suppliers/show',[
            'supplier' => new SupplierResource($supplier)->resolve(),
            'ingredients' => SupplierIngredientResources::collection($supplier->ingredients)->resolve(),
            'unlistedIngredients' => UnlistedIngredientResourcee::collection($unassociated_ingredients)->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tenant $tenant, Supplier $supplier)
    {
        return Inertia::render('inventory/suppliers/edit',[
            'supplier'  => new SupplierResource($supplier)->resolve(),
            'countries' => $this->countries(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Tenant $tenant, Supplier $supplier)
    {
        $validated = $request->validated();

        $supplier->update($validated);

        Controller::toast('Supplier updated successfully!', 'success');
        return redirect()->route('inventory.suppliers.show', ['tenant' => $tenant->id, 'supplier' => $supplier->slug]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->ingredients()->detach();
        $supplier->categories()->detach();
        $supplier->tags()->detach();
        $supplier->delete();
        
        Controller::toast('Supplier deleted successfully!', 'success');
        return response(status: 200);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param Tenant $tenant
     * @param Supplier $supplier
     * @return Response
     */
    public function restore(Supplier $supplier)
    {
        //
    }


    /**
     * Force delete the specified resource from storage.
     *
     * @param Tenant $tenant
     * @param Supplier $supplier
     * @return Response
     */
    public function forceDelete(Supplier $supplier)
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
