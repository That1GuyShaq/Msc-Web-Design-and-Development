
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/data-table';
import { columns } from './partials/ingredient-columns';
import { type Auth, type BreadcrumbItem } from '@/types';
import { Supplier, SupplierIngredient } from '@/types/modules/inventory';
import { SupplierHeader } from '@/pages/inventory/suppliers/partials/header';
import SupplierIngredientDialog from '@/pages/inventory/suppliers/partials/ingredient-dialog';

export default function Show({ auth, supplier, ingredients, unlistedIngredients }: { auth: Auth, supplier: Supplier, ingredients: SupplierIngredient[], unlistedIngredients: SupplierIngredient[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inventory',
            href: '/dashboard',
        },
        {
            title: 'Suppliers',
            href: '/inventory/suppliers',
        },
        {
            title: supplier.name,
            href: '/inventory/suppliers/' + supplier.slug,
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={ supplier.name } />
            <SupplierHeader 
                tenant={auth.tenant} 
                supplier={supplier}
                edit={auth.permissions.includes('update supplier')} 
                destroy={auth.permissions.includes('delete supplier')} />
                
            <DataTable 
                rows={10}
                columns={columns}
                data={ingredients}
                className="grid grid-cols-1 gap-4"
                create={['create ingredient', 'update supplier'].every(permission => auth.permissions.includes(permission))}
                actions={['update ingredient', 'update supplier'].some(permission => auth.permissions.includes(permission))}
                dialog={<SupplierIngredientDialog tenant={auth.tenant} slug={supplier.slug} editing={false} unlistedIngredients={unlistedIngredients} key="new" />} />
        </AppLayout>
    );
}