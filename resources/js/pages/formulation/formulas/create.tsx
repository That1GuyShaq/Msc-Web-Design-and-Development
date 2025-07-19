
import { Head } from '@inertiajs/react';
import FormulaForm from './partials/formula-form';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Auth, type Category } from '@/types';

export default function Create({ auth, categories }: { auth: Auth, categories: Category[] }) {
    
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
            title: 'Create',
            href: '/formulation/formulas/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Formula" />
            <FormulaForm tenant={auth.tenant} categories={categories} />
        </AppLayout>
    );
}