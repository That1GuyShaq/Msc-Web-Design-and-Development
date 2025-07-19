
import { type Auth } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { Ingredient } from '@/types/modules/inventory';
import { columns } from './partials/ingredient-columns';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function Index({ auth, ingredients }: { auth: Auth, ingredients: Ingredient[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inventory',
            href: '/dashboard',
        },
        {
            title: 'Ingredients',
            href: '/inventory/ingredients',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ingredients" />
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
                            data={ingredients} 
                            columns={columns}
                            className="grid grid-cols-1 gap-4"
                            create={auth.permissions.includes('create ingredient')}
                            link={{ name: 'Add ingedient', href: route('inventory.ingredients.create', { tenant: auth.tenant.id }) }} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}