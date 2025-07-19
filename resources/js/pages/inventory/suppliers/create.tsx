
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Auth, Country, type BreadcrumbItem } from '@/types';
import { SupplierForm } from '@/pages/inventory/suppliers/partials/form';

export default function Create({ auth, countries } : { auth: Auth, countries: Country[] }) {
    
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
            title: 'Create',
            href: '/inventory/supplier/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Supplier" />
            <SupplierForm tenant={auth.tenant} countries={countries} />
        </AppLayout>
    );
}