
import { Head } from '@inertiajs/react';
import FormulaForm from './partials/formula-form';
import AppLayout from '@/layouts/app-layout';
import { Formula } from '@/types/modules/formulation';
import { Category, Tag, type Auth, type BreadcrumbItem } from '@/types';

export default function Edit({  auth, formula, categories, tags, statuses } : { auth: Auth, formula: Formula, categories: Category[], tags: Tag[], statuses: string[] }) {
    
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
            title: 'Edit',
            href: '/formulation/formula' + formula.slug + '/edit',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Formula" />
            <FormulaForm tenant={auth.tenant} formula={formula} categories={categories} statuses={statuses} />
        </AppLayout>
    );
}