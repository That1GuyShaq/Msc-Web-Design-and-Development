
import { Head } from '@inertiajs/react';
import NoteForm from './partials/note-form';
import AppLayout from '@/layouts/app-layout';
import { Formula } from '@/types/modules/formulation';
import { type Auth, type BreadcrumbItem } from '@/types';

export default function Edit({  auth, formula } : { auth: Auth, formula: Formula }) {
    
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
            href: '/formulation/formula' + formula.slug + '/notes/edit',
        },
        {
            title: 'Notes',
            href: '/formulation/formula' + formula.slug + '/notes/edit',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Notes" />
            <NoteForm tenant={auth.tenant} formula={formula} editing={true} />
        </AppLayout>
    );
}