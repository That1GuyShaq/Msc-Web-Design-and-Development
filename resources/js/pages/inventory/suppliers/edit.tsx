
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Supplier } from '@/types/modules/inventory';
import { Auth, Country, type BreadcrumbItem} from '@/types';
import { SupplierForm } from '@/pages/inventory/suppliers/partials/form';

export default function Edit({ auth, supplier, countries } : { auth: Auth, supplier: Supplier, countries: Country[] }) {
    
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
            href: '/inventory/supplier/' + supplier.slug,
        },
        {
            title: 'Edit',
            href: '/inventory/supplier/' + supplier.slug + '/edit',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Supplier" />
            <SupplierForm tenant={auth.tenant} supplier={supplier} countries={countries} />
        </AppLayout>
    );
}