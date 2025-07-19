"use client"


import { useState, useEffect } from 'react';
import { Tenant } from '@/types';
import { useForm, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { SupplierIngredient } from '@/types/modules/inventory';
import { Plus, Loader2, Edit } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog";

interface Properties {
    id: number,
    name: string,
    unit: string,
    cost_per_unit: string,
    currency: string,
    url: string
}
export default function SupplierIngredientDialog({ tenant, unlistedIngredients, slug, editing, supplierIngredient }: { tenant: Tenant, unlistedIngredients?: SupplierIngredient[], slug: string, editing?: boolean, supplierIngredient?: SupplierIngredient }) {
    
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const units = ['g', 'ml', 'kg', 'L', 'oz', 'lb'];
    const currencies = ['EUR', 'USD', 'GBP', 'TTD'];

    const { data, setData, post, put, errors, reset, processing } = useForm<Required<Properties>>({
        id: 0,
        name: '',
        unit: '',
        cost_per_unit: '0.00',
        currency: '',
        url: ''
    });

    useEffect(() => {
        if (!isDialogOpen) return

        if (editing && supplierIngredient) {
        setData("id",             supplierIngredient.id)
        setData("name",           supplierIngredient.name)
        setData("unit",           supplierIngredient.unit)
        setData("cost_per_unit",  supplierIngredient.cost_per_unit)
        setData("currency",       supplierIngredient.currency)
        setData("url",            supplierIngredient.url)
        } else {
        // “create” mode: clear out anything left over
        reset()
        }
    }, [isDialogOpen, supplierIngredient])

    const submit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editing) {
            put(route('inventory.suppliers.ingredients.update', { tenant: tenant.id, supplier: slug, ingredient: data.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDialogOpen(false);
                },
            });
        } else {
            post(route('inventory.suppliers.ingredients.store', { tenant: tenant.id, supplier: slug }), {
                preserveScroll: true,
                onSuccess: () => {
                   setIsDialogOpen(false);
                },
            });
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {editing ? 
                <Edit className="h-4 w-4 text-neutral-500 hover:text-amber-400" /> : 
                <Button variant='ghost' className="text-sm">
                    <Plus size={20} /> Add ingredient
                </Button>}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editing ? 'Update' : 'Add'} ingredient</DialogTitle>
                    <DialogDescription>
                        {editing ? 'Update an existing ingredient in a suppliers catalog.' : 'Add a pre-existing ingredient to a suppliers catalog.'} 
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid grid-cols-9 gap-4" id="supplier-ingredient-form">

                    <div className="col-span-9 grid gap-2">
                        <Label htmlFor="ingredient">Ingredient</Label>
                        {editing ?
                        <Input 
                            id="ingredient" 
                            disabled
                            value={data.name} />
                            :
                        <Select value={data.id.toString()} onValueChange={(value) => setData("id", Number.parseInt(value, 10))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select ingredient..." />
                            </SelectTrigger>
                            <SelectContent>
                                {unlistedIngredients?.map((ingredient) => (
                                    <SelectItem key={ingredient.id} value={ingredient.id.toString()}>
                                        {ingredient.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>}
                        <InputError message={errors.id} />
                    </div>

                    <div className="col-span-3">
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={data.currency} onValueChange={(selectedCurrency) => setData("currency", selectedCurrency)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select currency..." />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((currency) => (
                                    <SelectItem key={currency} value={currency}>
                                        {currency}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.currency} />
                    </div>

                    <div className="col-span-3">
                        <Label htmlFor="cost_per_unit">Cost Per Unit</Label>
                        <Input 
                            id="cost_per_unit" 
                            type="number" 
                            step={0.01}
                            min={0}
                            value={data.cost_per_unit} 
                            onChange={(e) => setData("cost_per_unit", e.target.value)} />
                        <InputError message={errors.cost_per_unit} />
                    </div>

                    <div className="col-span-3">
                        <Label htmlFor="unit">Unit</Label>
                        <Select value={data.unit} onValueChange={(selectedUnit) => setData("unit", selectedUnit)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select unit..." />
                            </SelectTrigger>
                            <SelectContent>
                                {units.map((unit) => (
                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.unit} />
                    </div>

                    <div className="col-span-9">
                        <Label htmlFor="url">Product URL</Label>
                        <Input 
                            id="url" 
                            type="url"
                            value={data.url} 
                            onChange={(e) => setData('url', e.target.value)} />
                        <InputError message={errors.url} />
                    </div>
                    
                </form>
                <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" form='supplier-ingredient-form' disabled={processing}>
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editing ? 
                        <>{processing ? "Updating..." : "Update"}</>
                    : 
                        <>{processing ?  "Saving..." : "Save"}</>
                    }
                </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}    