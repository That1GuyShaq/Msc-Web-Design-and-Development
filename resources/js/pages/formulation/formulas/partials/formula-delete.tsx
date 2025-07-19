
import axios from 'axios';
import { useState } from 'react';
import { Tenant } from '@/types';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2 } from 'lucide-react';
import { router } from "@inertiajs/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function FormulaDelete({ slug, name, icon = false, tenant }: { slug: string, name: string, icon?: boolean, tenant: Tenant }) {

    const [confirmDisabled, setConfirmDisabled] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === 'DELETE FORMULA') {
            setConfirmDisabled(false);
        }
    }
    const deleteFormula = (slug: string) => {
        
        setProcessing(true);
        setIsOpen(false);
        
        axios.delete(route('formulation.formulas.destroy', [tenant.id, slug])).then((response) => {
            if (response.status === 200) {
                router.visit(route('formulation.formulas.index', { tenant: tenant.id }));
            }
        }).finally(() => {
            
        });
    };
  
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {icon ? <Trash2 className="h-4 w-4 text-rose-900 hover:text-rose-600 dark:text-rose-600 dark:hover:text-rose-900 cursor-pointer" />
                : 'Delete Supplier'}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-justify">
                        This action cannot be undone. This will permanently delete the {name} formula and remove all its associated data from the servers. This includes all versions of the formula alog with their, notes, phases, methods and batching history.<br />  Type "<span className='font-bold text-red-900'>DELETE FORMULA</span>" to confirm.
                        <Input placeholder="DELETE FORMULA" className="mt-4" onChange={handleInput} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={processing} onClick={() => deleteFormula(`${slug}`)}>
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {processing ?  "Deleteing..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

