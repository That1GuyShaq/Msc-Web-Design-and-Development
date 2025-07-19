
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Auth, Category, type BreadcrumbItem } from '@/types';
import { Ingredient } from '@/types/modules/inventory';
import IngredientForm from '@/pages/inventory/ingredients/partials/form';

export default function Edit({ auth, ingredient, categories, states } : { auth: Auth, ingredient: Ingredient, categories: Category[], states: string[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inventory',
            href: '/dashboard',
        },
        {
            title: 'Stock',
            href: '/inventory/edients',
        },
        {
            title: 'Edit',
            href: '/inventory/edients/edit',
        },
        {
            title: ingredient.name,
            href: '/inventory/ingredients/' + ingredient.slug,
        },
        {
            title: 'Edit',
            href: '/inventory/ingredients/' + ingredient.slug + '/edit',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Ingredient" />
            <IngredientForm tenant={auth.tenant} ingredient={ingredient} categories={categories} states={states} />
        </AppLayout>
    );
}