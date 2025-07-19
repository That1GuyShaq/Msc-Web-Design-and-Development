
import { Tenant } from "@/types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Formula } from "@/types/modules/formulation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function NoteForm({ tenant, formula, editing = false }: { tenant: Tenant, formula: Formula, editing?: boolean }) {
    
    const { data, setData, put, errors, setError, processing } = useForm({
            notes: formula.notes || '',
        });

    const characterLimit = 5000;
    const characterCount = data.notes.length;

    useEffect(() => {
        if (characterCount > characterLimit) {
            setData('notes', data.notes.slice(0, characterLimit));
            setError('notes', 'Character limit reached');
            setTimeout(() => {
                setError('notes', '');
            }, 1000);
        }
    }, [data.notes, setData, characterCount]);
    const submit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('formulation.formula.notes.update', { tenant: tenant.id, formula: formula.slug }), { 
            preserveScroll: true,
        });
    };
    
    return (
        <div className="h-full flex-1 flex-col gap-4 rounded-2xl p-4 grid lg:grid-cols-6">
            <form onSubmit={submit} className="col-start-2 col-end-6 grid auto-rows-min gap-4 lg:grid-cols-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{editing ? "Update notes" : "Add notes"}</CardTitle>
                        <CardDescription>Use the box below to {editing ? "update the" : "add"} formula notes</CardDescription>
                    </CardHeader>
                    <CardContent className="grid auto-rows-min gap-4 lg:grid-cols-6">
                        <div className="col-span-6 grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="description"
                                value={data.notes}
                                className='h-70 text-justify'
                                onChange={(e) => setData('notes', e.target.value)} />
                            <span className="text-xs text-muted-foreground">{characterCount}/{characterLimit} Words</span>
                            <InputError message={errors.notes} />
                        </div>
                    </CardContent>
                    <CardFooter className='flex justify-end'>
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {editing ? 
                                <>{processing ? "Updating..." : "Update"}</>
                            : 
                                <>{processing ?  "Saving..." : "Save"}</>
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}