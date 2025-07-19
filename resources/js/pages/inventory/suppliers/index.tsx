
import { type Auth } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './partials/supplier-columns';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { Supplier } from '@/types/modules/inventory';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function Index({ auth, suppliers }: { auth: Auth, suppliers: Supplier[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inventory',
            href: '/dashboard',
        },
        {
            title: 'Suppliers',
            href: '/inventory/suppliers',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Suppliers" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-35 overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-35 overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-35 overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden gap-4 md:min-h-min">
                    <div className="grid grid-cols-1">
                        <DataTable 
                            rows={10}
                            data={suppliers} 
                            columns={columns}
                            className="grid grid-cols-1 gap-4"
                            create={auth.permissions.includes('create supplier')}
                            link={{ name: 'Add supplier', href: route('inventory.suppliers.create', { tenant: auth.tenant.id }) }} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}