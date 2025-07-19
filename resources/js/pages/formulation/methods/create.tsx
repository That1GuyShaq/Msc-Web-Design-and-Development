
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import MethodsForm from './partials/method-form';
import { Plus, Edit, Check } from 'lucide-react';
import { type Auth, type BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Formula, ListedPhase, BackendPhaseIngredient } from '@/types/modules/formulation';

export default function CreateMethods({ auth, formula }: { auth: Auth, formula: Formula }) {
    
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
        {
            title: 'Methods',
            href: '/formulation/formulas/' + formula.slug + '/methods/create',
        },
        {
            title: 'Create',
            href: '/formulation/formulas/' + formula.slug + '/methods/create',
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Method" />
            <div className="grid lg:grid-cols-6 gap-4">
                <MethodsForm tenant={auth.tenant.id} formula={formula} />
                
                <Card className="col-span-2">
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
                        <CardContent>
                            {formula.phases.length === 0 ? <p className="text-muted-foreground">No phases</p> :
                            formula.phases.map((phase) => (
                                <section key={phase.id} className="first:mt-0 mt-4">
                                    <h3>{phase.name}</h3>
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
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
