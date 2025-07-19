
import { Loader2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { type Category, type Tenant } from "@/types";
import { Formula } from "@/types/modules/formulation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function FormulaForm({ formula, tenant, categories, statuses } : { formula?: Formula, tenant: Tenant, categories: Category[], statuses?: string[] }) {
    
    const editing = Boolean(formula);    
    const { data, setData, post, put, errors, processing } = useForm({
        name: formula?.name ?? '',
        description: formula?.description ?? '',
        status: formula?.status ?? '',
        category: formula?.category?.id?.toString() ?? '',
    });

    const submit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (editing) {
            put(route('formulation.formulas.update', { tenant: tenant.id, formula: formula?.slug }), { 
                preserveScroll: true,
            });
        } else {
            post(route('formulation.formulas.store', { tenant: tenant.id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="h-full flex-1 flex-col gap-4 rounded-2xl p-4 grid lg:grid-cols-6">
            <form onSubmit={submit} className="col-start-2 col-end-6 grid auto-rows-min gap-4 lg:grid-cols-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{editing ? "Update formula" : "Add formula"}</CardTitle>
                        <CardDescription>Use the form below to {editing ? "update" : "add"} the inital details of your formula. You will be adding the other information once reated</CardDescription>
                    </CardHeader>
                    <CardContent className="grid auto-rows-min gap-4 lg:grid-cols-6">
                        <div className="col-span-6">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={e => setData("name", e.target.value)} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="col-span-6 grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                className='h-32'
                                onChange={(e) => setData('description', e.target.value)} />
                            <InputError message={errors.description} />
                        </div>

                        <div className="col-span-6 grid gap-2">
                            <Label htmlFor="category">Categories</Label>
                            <RadioGroup 
                                value={data.category} // Controlled component: display the value from data.category
                                onValueChange={(value: string) => setData('category', value)} // Update data.category when a radio item is selected
                                >
                                <div className="grid grid-flow-row-dense grid-cols-3 gap-2">
                                    {categories.map((category) => (
                                        <div key={category.id} className="flex items-start gap-3">
                                            <RadioGroupItem 
                                                value={category.id.toString()} 
                                                id={`category-${category.id}`} 
                                                />
                                            <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                            <InputError message={errors.category} />
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