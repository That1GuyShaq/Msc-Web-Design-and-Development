
import { Head } from '@inertiajs/react';
import PhaseForm from './partials/phase-form';
import AppLayout from '@/layouts/app-layout';
import { type Auth, type BreadcrumbItem } from '@/types';
import { Formula, ComboboxIngredientOption } from '@/types/modules/formulation';

export default function Create({ auth, formula, ingredients }: { auth: Auth, formula: Formula, ingredients: ComboboxIngredientOption[] }) {
    
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
            title: 'Create',
            href: '/formulation/formulas/' + formula.slug + '/phases/create',
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Phase" />
            <PhaseForm tenant={auth.tenant.id} formula={formula} ingredients={ingredients} />
        </AppLayout>
    );
}