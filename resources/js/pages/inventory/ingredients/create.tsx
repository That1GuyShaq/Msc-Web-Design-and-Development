
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type Category, type Auth, type BreadcrumbItem } from '@/types';
import IngredientForm from '@/pages/inventory/ingredients/partials/form';

export default function Create({ auth, categories, states } : { auth: Auth, categories: Category[], states: string[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inventory',
            href: '/dashboard',
        },
        {
            title: 'Ingredients',
            href: '/inventory/ingredients',
        },
        {
            title: 'Create',
            href: '/inventory/ingredients/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Ingredient" />
            <IngredientForm tenant={auth.tenant} categories={categories} states={states} />
        </AppLayout>
    );
}