
import { toast } from "sonner";
import MethodRow from "./method-row";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Plus, Loader2, Car } from "lucide-react";
import { useCallback, useMemo, useEffect } from "react";
import { Method, MethodFormData, MethodFormProps } from '@/types/modules/formulation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";


export default function MethodsForm({ tenant, formula, method }: MethodFormProps) {
    console.log(formula);
    
    const editing = Boolean(method);

    const { data, setData, post, put, errors, setError, processing } = useForm<MethodFormData>({
        methods: method ? method.map((methodStep: Method) => ({
            ...methodStep,
            id: `method-${crypto.randomUUID()}`, 
        })) : [
            {
                id: `method-${crypto.randomUUID()}`,
                step: 1,
                formula_id: formula.id,
                instruction: '',
            }
        ]
    });
    

    const addMethod = useCallback(() => {
        setData((prevData: MethodFormData) => {
            const newStepNumber = prevData.methods.length + 1;
            const newMethod: Method = {
                id: `method-${crypto.randomUUID()}`,
                step: newStepNumber,
                formula_id: formula.id,
                instruction: '',
            };
            return {
                ...prevData,
                methods: [...prevData.methods, newMethod],
            };
        });
    }, [setData, formula.id]);

    const updateMethod = useCallback((updatedMethod: Method) => {
        setData((prevData: MethodFormData) => ({
            ...prevData,
            methods: prevData.methods.map((method: Method) =>
                method.id === updatedMethod.id ? updatedMethod : method
            ),
        }));
    }, [setData]);

    const deleteMethod = useCallback((methodIdToDelete: string) => {
        setData((prevData: MethodFormData) => {
            if (prevData.methods.length === 1) {
                setError('methods', 'Cannot delete the last step. At least one step is required.');
                toast.error('Cannot delete the last step. At least one step is required.');
                
                setTimeout(() => setError('methods', ''), 5000);
                return prevData;
            }

            let newMethods = prevData.methods.filter((methodStep: Method) => methodStep.id !== methodIdToDelete);
            
            newMethods = newMethods.map((methodStep: Method, index: number) => ({
                ...methodStep,
                step: index + 1,
            }));
            return {
                ...prevData,
                methods: newMethods,
            };
        });
    }, [setData, setError, toast]);

    const formatErrorMessage = (message: string): string => {
        return message
            .replace(/methods\.\d+\./, '') // Remove 'methods.X.' prefix
            .replace(/_id/g, ' ') // Replace '_id' with ' '
            .replace(/_/g, ' ') // Replace '_' with ' '
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    };

    const allMappedErrors = useMemo(() => {
        const errorsMap: { [frontendId: string]: { [field: string]: string } } = {};
        
        for (const errorKey in errors) {
            const errorMessage = errors[errorKey] || '';
            const parts = errorKey.split('.');

            if (parts[0] === 'methods' && parts.length === 3) {
                const backendIndex = parseInt(parts[1]);
                const fieldName = parts[2];

                const matchingMethod = data.methods[backendIndex];

                if (matchingMethod) {
                    const frontendMethodId = matchingMethod.id;
                    if (frontendMethodId) {
                        if (!errorsMap[frontendMethodId]) {
                            errorsMap[frontendMethodId] = {};
                        }
                        
                        errorsMap[frontendMethodId][fieldName] = formatErrorMessage(errorMessage);
                    }
                }
            }
        }
        return errorsMap;
    }, [errors, data.methods]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedData = data.methods.map(({ id, ...rest }) => ({
            ...rest,
            formula_id: formula.id,
        }));
        
        if (editing) {
            put(route('formulation.formula.methods.update', { tenant: tenant, formula: formula.slug }),{ 
                ...formattedData, 
                preserveScroll: true
            });
        } else {
            post(route('formulation.formula.methods.store', { tenant: tenant, formula: formula.slug }), {
                ...formattedData,
                preserveScroll: true
            });
        }
    };

    useEffect(() => {
        // console.log("Current Methods Data (from useForm):", data.methods);
        console.log("Current Errors (from useForm):", errors);
        console.log("Mapped Errors (for frontend display):", allMappedErrors);
    }, [errors, allMappedErrors]);

    return (
        <form onSubmit={submit} className="col-span-4 grid auto-rows-min gap-4 lg:grid-cols-4">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>{editing ? "Update Methods" : "Add Methods"}</CardTitle>
                    {/* Display general errors for the 'methods' array */}
                    {errors.methods ? (
                        <InputError message={errors.methods} />
                    ) : (
                        <CardDescription>Define the step-by-step instructions for your cosmetic formulation.</CardDescription>
                    )}
                </CardHeader>
                <CardContent className="grid grid-cols-6 gap-4">
                    {/* Button to add a new step */}
                    <div className="col-span-6 flex gap-2 justify-end">
                        <Button type="button" variant="ghost" onClick={addMethod}>
                            <Plus className="h-4 w-4" />
                            Add Step
                        </Button>
                    </div>
                    <div className="col-span-6">
                        {/* Render each MethodSection component */}
                        {data.methods.map((method) => (
                            <MethodRow
                                key={method.id} // Use the frontend ID as the key
                                method={method}
                                onUpdateMethod={updateMethod}
                                onDeleteMethod={deleteMethod}
                                // Pass errors relevant to this specific method
                                errors={allMappedErrors[method.id] || {}}
                            />
                        ))}
                    </div>
                </CardContent>
                <CardFooter className='flex justify-end'>
                    {/* Submit button with loading indicator */}
                    <Button type="submit" disabled={processing}>
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editing ?
                            <>{processing ? "Updating..." : "Update"}</>
                            :
                            <>{processing ? "Saving..." : "Save"}</>
                        }
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
