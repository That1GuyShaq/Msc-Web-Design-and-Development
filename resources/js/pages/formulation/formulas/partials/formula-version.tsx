
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { Tenant } from '@/types';
import { router } from "@inertiajs/react";
import { Loader2, Split } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function FormulaVersion({ slug, tenant }: { slug: string, tenant: Tenant }) {

    const [processing, setProcessing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const versionFormula = (slug: string) => {
        
        setProcessing(true);
        setIsOpen(false);
        
        axios.put(route('formulation.formulas.version', [tenant.id, slug])).then((response) => {
             const status = response.status;
            if (status === 204) {
                toast.success('Formula versioned successfully! You will be redirected to the new version in a few seconds.');
            }
        }).finally(() => {
            router.visit(route('formulation.formulas.show', [tenant.id, slug]));

        }).catch((error) => {
            toast.error(error.response.data.message +': Something went wrong! Please try again.');
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Split className="h-4 w-4 text-amber-900 hover:text-amber-600 dark:text-amber-600 dark:hover:text-amber-900 cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-justify">
                        This action cannot be undone. This will permanently archive this version of the formula and create a new one.<br /> Only do this if you sure you no longer want to use this formula for production. It will remain avialible for refernce but you wont be able to edit or use it for batching.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={processing} onClick={() => versionFormula(`${slug}`)}>
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {processing ?  "Versioning..." : "Version"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

