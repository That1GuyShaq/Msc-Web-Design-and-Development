
import { Loader2 } from "lucide-react";
import { Tenant, Category } from "@/types";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Ingredient } from "@/types/modules/inventory";
import { Tooltip, TooltipContent,  TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function IngredientForm({ ingredient, tenant, categories, states } : { ingredient?: Ingredient, tenant: Tenant, categories: Category[], states: string[] }) {

    const editing = Boolean(ingredient);    
    const { data, setData, post, put, errors, processing } = useForm({
        name: ingredient?.name ?? '',
        state_of_matter: ingredient?.state_of_matter ?? '',
        cas_number: ingredient?.cas_number ?? '',
        ec_number: ingredient?.ec_number ?? '',
        inci_name: ingredient?.inci_name ?? '',
        description: ingredient?.description ?? '',
        categories: ingredient?.categories?.map(cat => cat.id) ?? []
    });

    const submit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (editing) {
            put(route('inventory.ingredients.update', { tenant: tenant.id, ingredient: ingredient?.slug }), { 
                preserveScroll: true,
            });
        } else {
            post(route('inventory.ingredients.store', { tenant: tenant.id }), {
                preserveScroll: true,
            });
        }
    };

    const handleCategoryChange = (checked: boolean, categoryId: number) => {
        if (checked) {
            // Add the category ID if it's checked
            setData('categories', [...data.categories, categoryId]);
        } else {
            // Remove the category ID if it's unchecked
            setData('categories', data.categories.filter((id) => id !== categoryId));
        }
    };

    return (
        <div className="h-full flex-1 flex-col gap-4 rounded-2xl p-4 grid lg:grid-cols-6">
            <form onSubmit={submit} className="col-start-2 col-end-6 grid auto-rows-min gap-4 lg:grid-cols-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{editing ? "Update ingredient" : "Add ingredient"}</CardTitle>
                        <CardDescription>Use the form below to {editing ? "update" : "add"} an ingredient and it associated details</CardDescription>
                    </CardHeader>
                    <CardContent className="grid auto-rows-min gap-4 lg:grid-cols-6">
                        <div className="col-span-4">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={e => setData("name", e.target.value)} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="col-span-2">
                            <Label htmlFor="state">State of Matter</Label>
                            <Select value={data.state_of_matter} onValueChange={(value) => setData("state_of_matter", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a state of mater..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state.charAt(0).toUpperCase() + state.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.state_of_matter} />
                        </div>

                        <div className="col-span-6">
                            <Label htmlFor="inci_name">INCI Name</Label>
                            <Input 
                                id="inci_name"
                                type="text"
                                value={data.inci_name}
                                onChange={e => setData("inci_name", e.target.value)} />
                            <InputError message={errors.inci_name} />
                        </div>

                        <div className="col-span-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                className='h-32'
                                value={data.description} 
                                onChange={e => setData("description", e.target.value)} />
                            <InputError message={errors.description} />
                        </div>

                        <div className="col-span-2 grid gap-4">
                            <div>
                                <Label htmlFor="cas_number">CAS Number</Label>
                                <Input 
                                    id="cas_number"
                                    type="text"
                                    pattern="[0-9]{2,7}-[0-9]{2}-[0-9]{1}$"
                                    value={data.cas_number}
                                    onChange={e => setData("cas_number", e.target.value)} />
                                <InputError message={errors.cas_number} />
                            </div>

                            <div>
                                <Label htmlFor="ec_number">EC Number</Label>
                                <Input 
                                    id="ec_number"
                                    type="text"
                                    pattern="^\[0-9]{3}-[0-9]{3}-[0-9]{1}$"
                                    value={data.ec_number}
                                    onChange={e => setData("ec_number", e.target.value)} />
                                <InputError message={errors.ec_number} />
                            </div>
                        </div>

                        <div className="col-span-6 grid gap-2">
                            <Label htmlFor="categories">Properties</Label>
                            <div className="grid grid-flow-row-dense grid-cols-2 gap-2">
                                {categories.map((category) => (
                                <div key={category.id} className="flex items-start gap-3">
                                    <Checkbox
                                        name="categories[]"
                                        value={category.id}
                                        id={`category-${category.id}`}
                                        checked={data.categories.includes(category.id)}
                                        onCheckedChange={(checked: boolean) => handleCategoryChange(checked, category.id)}
                                    />
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <Label htmlFor={`category-${category.id}`} >
                                            {category.name}
                                        </Label>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span>
                                                {category.description}
                                            </span>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            ))}
                            </div>
                            <InputError message={errors.categories} />
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editing ? 
                                <>{processing ? "Updating..." : "Update"}</>
                            : 
                                <>{processing ?  "Saving..." : "Save"}</>
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}