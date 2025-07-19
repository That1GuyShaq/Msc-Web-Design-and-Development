
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Check, Edit, Plus } from "lucide-react";
import { FormulaHeader } from './partials/header';
import { Auth, type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phase, Formula, BackendPhaseIngredient } from "@/types/modules/formulation";

export default function Show({ auth, formula } : { auth: Auth, formula: Formula }) {
    console.log("Formula prop received by Show:", formula);
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Formulation',
            href: '/dashboard',
        },
        {
            title: 'Formulas',
            href: '/formulation/formulas',
        },
        {
            title: formula.name,
            href: '/formulation/formulas/' + formula.slug,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={formula.name} />
            <FormulaHeader 
                tenant={auth.tenant} 
                formula={formula} 
                edit={auth.permissions.includes('update formula')} 
                destroy={auth.permissions.includes('delete formula')} />
            <div className="grid grid-cols-7 gap-2 mt-2">
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Phases
                            <Button variant='ghost' asChild>
                                {['create phase', 'update phase'].every(permission => auth.permissions.includes(permission)) && (formula.phases.length === 0 ? 

                                    (auth.permissions.includes('create phase') && <Link className="text-sm" href={route('formulation.formula.phases.create', [auth.tenant.id, formula.slug])}>
                                        <Plus size={20} /> Add phase
                                    </Link>) 
                                : 
                                    (auth.permissions.includes('update phase') && <Link className="text-sm" href={route('formulation.formula.phases.edit', [auth.tenant.id, formula.slug])}>
                                        <Edit size={20} /> Edit phases
                                    </Link>))}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {formula.phases.length === 0 ? <p className="text-muted-foreground">No phases</p> :
                        formula.phases.map((phase) => (
                            <section key={phase.id} className="first:mt-0 mt-4">
                                <p>{phase.name}</p>
                                <ul className="ms-8 text-muted-foreground list-disc">
                                    {phase.ingredients.map((ingredient : BackendPhaseIngredient) => (
                                        <li key={ingredient.id}>
                                            <p className="flex justify-between">
                                                <small className="gap-2">
                                                    {ingredient.inci_name}
                                                </small>
                                                {ingredient.quantity_sufficient ? 
                                                <small className="flex items-center gap-2 h-4">
                                                    QS <Check size={16} className="text-green-500" />
                                                </small>
                                                : <small className="flex items-center gap-2 h-4">
                                                    {ingredient.percentage_weight_per_weight + ' %'}
                                                </small>}
                                                
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </CardContent>
                </Card>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Notes
                            <Button variant='ghost' asChild>
                                {['create formula', 'update formula'].every(permission => auth.permissions.includes(permission)) && (formula.notes === null ? 

                                    (auth.permissions.includes('create formula') && <Link className="text-sm" href={route('formulation.formula.notes.create', [auth.tenant.id, formula.slug])}>
                                        <Plus size={20} /> Add notes
                                    </Link>) 
                                : 
                                    (auth.permissions.includes('update formula') && <Link className="text-sm" href={route('formulation.formula.notes.edit', [auth.tenant.id, formula.slug])}>
                                        <Edit size={20} /> Edit notes
                                    </Link>))}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-justify overflow-hidden text-ellipsis">
                            {formula.notes}
                        </p>
                    </CardContent>
                </Card>

                <Card className="col-span-7 h-100">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Method
                            <Button variant='ghost' asChild>
                                {['create method', 'update method'].every(permission => auth.permissions.includes(permission) && formula.method.length > 0) && (formula.method.length === 0 ? 

                                    (auth.permissions.includes('create method') && <Link className="text-sm" href={route('formulation.formula.methods.create', [auth.tenant.id, formula.slug])}>
                                        <Plus size={20} /> Add method
                                    </Link>) 
                                : 
                                    (auth.permissions.includes('update method') && <Link className="text-sm" href={route('formulation.formula.methods.edit', [auth.tenant.id, formula.slug])}>
                                        <Edit size={20} /> Edit method
                                    </Link>))}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {formula.method.length === 0 ? <p className="text-muted-foreground">No method</p> :
                        formula.method.map((method) => (
                                <section key={method.id} className="grid grid-cols-18 gap-4">
                                    <div className="col-span-1 flex items-start justify-end text-muted-foreground">
                                        <p className="">{`Step ${method.step}:`}</p>
                                    </div>
                                    <div className="col-span-17">
                                        <p>{method.instruction}</p>
                                    </div>
                                </section>
                            ))}
                    </CardContent>
                </Card>

            </div>
        </AppLayout>
    );
}