
import { useForm } from "@inertiajs/react";
import { Plus, Loader2 } from "lucide-react";
import { PhaseSection } from "./phase-section";
import { useMemo, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FrontendPhaseIngredient, BackendPhaseIngredient, ComboboxIngredientOption } from "@/types/modules/formulation";
import { Formula, Phase, PhaseData, PhaseFormData } from '@/types/modules/formulation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { only } from "node:test";
import { on } from "events";
import InputError from "@/components/input-error";
import { toast } from "sonner";

const getPhaseName = (index: number): string => {
    let result = '';
    let i = index;
    while (i >= 0) {
        result = String.fromCharCode(65 + (i % 26)) + result;
        i = Math.floor(i / 26) - 1;
    }
    return `Phase ${result}`;
};

interface PhasesFormProps {
    tenant: string;
    formula: Formula;
    ingredients: ComboboxIngredientOption[];
    phases?: Phase[];
}


export default function PhasesForm({ tenant, formula, ingredients, phases } : PhasesFormProps) {

    const editing = Boolean(phases);
    
    const { data, setData, post, put, errors, setError, processing } = useForm<PhaseFormData>({
         phases: phases ? phases.map((p: Phase) => ({
            id: `phase-${crypto.randomUUID()}`,
            name: p.name,
            ingredients: p.ingredients.map((ingredient: BackendPhaseIngredient) => ({
                id: `ingredient-${crypto.randomUUID()}`,
                ingredient_id: ingredient.id, 
                name: ingredient.name,
                inci_name: ingredient.inci_name,
                percentage_weight_per_weight: ingredient.percentage_weight_per_weight,
                quantity_sufficient: ingredient.quantity_sufficient,
            })) as FrontendPhaseIngredient[]
        })) : [
            {
                id: `phase-${crypto.randomUUID()}`,
                name: 'Phase A',
                ingredients: [
                    { 
                        id: `ingredient-${crypto.randomUUID()}`, 
                        ingredient_id: null, 
                        name: '',
                        inci_name: '', 
                        percentage_weight_per_weight: null, 
                        quantity_sufficient: false 
                    }
                ]
            }
        ]
    });
    
    const addPhase = useCallback(() => {
        setData((prevData: PhaseFormData) => {
            const newPhaseIndex = prevData.phases.length;
            const newPhaseName = getPhaseName(newPhaseIndex);
            const newPhase: PhaseData = {
                id: `phase-${crypto.randomUUID()}`,
                name: newPhaseName,
                ingredients: [
                    { 
                        id: `ingredient-${crypto.randomUUID()}`, 
                        name: '',
                        inci_name: '', 
                        ingredient_id: null, 
                        percentage_weight_per_weight: null, 
                        quantity_sufficient: false 
                    }
                ]
            };
            return {
                ...prevData,
                phases: [...prevData.phases, newPhase],
            };
        });
    },[setData]);
    
    const deletePhase = useCallback((phaseIdToDelete: string) => {
        setData((prevData: PhaseFormData) => {
            if (prevData.phases.length === 1) {
                
                setError('phases', 'Cannot delete the last phase. At least one phase is required.');
                setTimeout(() => setError('phases', ''), 5000);
                toast.error('Cannot delete the last phase. At least one phase is required.');
                return prevData;
            }

            let newPhases = prevData.phases.filter((phase) => phase.id !== phaseIdToDelete);
            newPhases = newPhases.map((phase, index) => ({
                ...phase,
                name: getPhaseName(index),
            }));
            return {
                ...prevData,
                phases: newPhases,
            };
        });
    }, [setData, errors.phases, setError, toast]);

    const addIngredient = useCallback((phaseId: string) => {
        setData((prevData: PhaseFormData) => ({
            ...prevData, phases: prevData.phases.map((phase) =>
                phase.id === phaseId
                ? {
                    ...phase, ingredients: [
                        ...phase.ingredients,
                        { 
                            id: `ingredient-${crypto.randomUUID()}`, 
                            ingredient_id: null, 
                            name: '',
                            inci_name: '',
                            percentage_weight_per_weight: null, 
                            quantity_sufficient: false
                        }
                    ],
                    }
                : phase
            ),
            }));
  }, [setData]);

    const updateIngredient = useCallback((phaseId: string, updatedIngredient: FrontendPhaseIngredient) => {
        setData((prevData: PhaseFormData) => ({
            ...prevData, phases: prevData.phases.map((phase) =>
            phase.id === phaseId
                ? {
                    ...phase,
                    ingredients: phase.ingredients.map((ingredient) =>
                    ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
                    ),
                }
                : phase
            ),
        }));
    }, [setData]);

  const deleteIngredient = useCallback((phaseId: string, ingredientIdToDelete: string) => { 
    setData((prevData: PhaseFormData) => ({
        ...prevData, phases: prevData.phases.map((phase) =>
            phase.id === phaseId
            ? { ...phase, ingredients: phase.ingredients.filter((ingredient) => ingredient.id !== ingredientIdToDelete), }
            : phase
        ),
    }));
  }, [setData]);

  const formatErrorMessage = (message: string): string => {
    return message
        .replace(/phases\.\d+\.ingredients\.\d+\./, '')
        .replace(/phases\.\d+\.ingredients\.\d+\./, '')
        .replace(/phases\.\d+\./, '')
        .replace(/_id/g, ' ')
        .replace(/_/g, ' ')
        .replace(/^./, (str) => str.toUpperCase());
  };

    const getFlatDataWithBackendIndices = useCallback(() => {
        let globalFlatIndex = 0;
        const flatData = data.phases.flatMap((phase, phaseBackendIndex) =>
            phase.ingredients.map((ingredient, ingredientBackendIndex) => {
                const item = {
                    name: phase.name,
                    ingredient_id: ingredient.ingredient_id,
                    percentage_weight_per_weight: ingredient.percentage_weight_per_weight,
                    quantity_sufficient: ingredient.quantity_sufficient,
                    formula_id: formula.id,
                };
                
                (item as any)._frontendIngredientId = ingredient.id;
                (item as any)._frontendPhaseId = phase.id;
                (item as any)._backendPhaseIndex = phaseBackendIndex;
                (item as any)._backendIngredientIndex = ingredientBackendIndex;
                (item as any)._globalFlatIndex = globalFlatIndex++;
                return item;
            })
        );
        return flatData;
    }, [data.phases, formula.id]);

    const allMappedErrors = useMemo(() => {
        const errorsMap: { [frontendId: string]: { [field: string]: string } } = {};
        const flatDataWithBackendIndices = getFlatDataWithBackendIndices();

        for (const errorKey in errors) {
            const errorMessage = errors[errorKey] || '';
            const parts = errorKey.split('.');

            if (parts[0] === 'phases') {
                if (parts.length === 3) { 
                    const backendPhaseIndex = parseInt(parts[1]);
                    const fieldName = parts[2];

                    const matchingItem = flatDataWithBackendIndices.find(item => 
                        (item as any)._backendPhaseIndex === backendPhaseIndex
                    );

                    if (matchingItem) {
                        const frontendPhaseId = (matchingItem as any)._frontendPhaseId;
                        if (frontendPhaseId) {
                            if (!errorsMap[frontendPhaseId]) {
                                errorsMap[frontendPhaseId] = {};
                            }
                            errorsMap[frontendPhaseId][fieldName] = formatErrorMessage(errorMessage);
                        }
                    }
                } else if (parts.length === 5 && parts[2] === 'ingredients') {
                    const backendPhaseIndex = parseInt(parts[1]);
                    const backendIngredientIndex = parseInt(parts[3]);
                    const fieldName = parts[4];

                    const matchingItem = flatDataWithBackendIndices.find(item => 
                        (item as any)._backendPhaseIndex === backendPhaseIndex &&
                        (item as any)._backendIngredientIndex === backendIngredientIndex
                    );

                    if (matchingItem) {
                        const frontendIngredientId = (matchingItem as any)._frontendIngredientId;
                        if (frontendIngredientId) {
                            if (!errorsMap[frontendIngredientId]) {
                                errorsMap[frontendIngredientId] = {};
                            }
                            errorsMap[frontendIngredientId][fieldName] = formatErrorMessage(errorMessage);
                        }
                    }
                }
            }
        }
        return errorsMap;
    }, [errors, getFlatDataWithBackendIndices]);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedData = getFlatDataWithBackendIndices();
        
        if (editing) {
            put(route('formulation.formula.phases.update', { tenant: tenant, formula: formula.slug }),{ 
                ...formattedData, 
                preserveScroll: true
            });
        } else {
            post(route('formulation.formula.phases.store', { tenant: tenant, formula: formula.slug }), {
                ...formattedData,
                preserveScroll: true
            });
        }
    };

    useEffect(() => {
        console.log("Current Formatted Phase Data (from useForm):", getFlatDataWithBackendIndices());
        console.log("Current Phases (from useForm):", data.phases);
        console.log("Current Errors (from useForm):", errors);
        console.log("Mapped Errors (for frontend display):", allMappedErrors);
    }, [data.phases, getFlatDataWithBackendIndices, errors, allMappedErrors]);
    
    return (
        <div className="h-full flex-1 flex-col gap-4 rounded-2xl p-4 grid lg:grid-cols-6">
            <form onSubmit={submit} className="col-start-2 col-end-6 grid auto-rows-min gap-4 lg:grid-cols-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>{editing ? "Update phases" : "Add phases"}</CardTitle>
                        {errors.phases ? (
                            <InputError message={errors.phases} />
                        ) : (
                            <CardDescription>Define the phases and ingredients for your cosmetic formulation.</CardDescription>
                        )}
                    </CardHeader>
                    <CardContent className="grid grid-cols-6 gap-4">
                        
                        <div className="col-span-6 flex gap-2 justify-end">
                            <Button type="button" variant="ghost" onClick={addPhase}>
                                <Plus className="h-4 w-4" />
                                Add phase
                            </Button>
                        </div>
                        <div className="col-span-6">
                            {data.phases.map((phase) => (
                                <PhaseSection 
                                    key={phase.id}
                                    phase={phase}
                                    onAddIngredient={addIngredient}
                                    onUpdateIngredient={updateIngredient}
                                    onDeleteIngredient={deleteIngredient}
                                    onDeletePhase={deletePhase}
                                    ingredientsOptions={ingredients}
                                    errors={errors}
                                    allMappedErrors={allMappedErrors}
                                />
                            ))}
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
    );
}