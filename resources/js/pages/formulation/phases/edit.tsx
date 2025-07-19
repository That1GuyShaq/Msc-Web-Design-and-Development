
import { Head } from '@inertiajs/react';
import PhaseForm from './partials/phase-form';
import AppLayout from '@/layouts/app-layout';
import { type Auth, type BreadcrumbItem } from '@/types';
import { Formula, ComboboxIngredientOption, Phase } from '@/types/modules/formulation';

export default function Edit({ auth, formula, phases, ingredients }: { auth: Auth, phases: Phase[], formula: Formula, ingredients: ComboboxIngredientOption[] }) {
    console.log("Phases prop received by Edit:", phases);
    
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
            title: 'Phases',
            href: '/formulation/formulas/' + formula.slug + '/phases/create',
        },
        {
            title: 'Edit',
            href: '/formulation/formulas/' + formula.slug + '/phases/edit',
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Phase" />
            <PhaseForm tenant={auth.tenant.id} phases={phases} formula={formula} ingredients={ingredients} />
        </AppLayout>
    );
}