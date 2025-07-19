
import { type Auth } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/data-table';
import { Formula } from '@/types/modules/formulation';
import { formulaColumns } from './partials/formula-columns';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function Index({ auth, formulas }: { auth: Auth, formulas: Formula[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Formulation',
            href: '/dashboard',
        },
        {
            title: 'Formulas',
            href: '/formulation/formulas',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Formulas" />
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
                            data={formulas} 
                            columns={formulaColumns}
                            className="grid grid-cols-1 gap-4"
                            create={auth.permissions.includes('create formula')}
                            link={{ name: 'Add formula', href: route('formulation.formulas.create', { tenant: auth.tenant.id }) }} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}