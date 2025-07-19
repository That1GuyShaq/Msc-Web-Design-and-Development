"use client"

import { Plus } from "lucide-react";
import IngredientRow from "./ingredient-row";
import { Button } from "@/components/ui/button";
import  InputError  from "@/components/input-error";
import { FrontendPhaseIngredient, PhaseSectionProps } from "@/types/modules/formulation";

export function PhaseSection({ phase, onAddIngredient, onUpdateIngredient, onDeleteIngredient, onDeletePhase, ingredientsOptions, errors,allMappedErrors } : PhaseSectionProps ) {

    const phaseNameError = allMappedErrors[phase.id]?.name;
    
    return (
        <div className="grid grid-cols-1 mt-4 gap-2">
            <div className="col-span-1 flex flex-row items-center justify-between">
                <h3>{phase.name}</h3>
                <div>
                    <Button type="button" variant="ghost" onClick={() => onAddIngredient(phase.id)}>
                        <Plus className="h-4 w-4" /> Add ingredient
                    </Button>

                    <Button type="button" variant="ghost" onClick={() => onDeletePhase(phase.id)} aria-label={`Delete ${phase.name}`} >
                        <Plus className="h-4 w-4" /> Delete phase
                    </Button>
                </div>
            </div>
            {phaseNameError && <InputError message={phaseNameError} />}
            <div className="col-span-1 border rounded-lg">
                {phase.ingredients.length === 0 && (
                    <p className="text-muted-foreground ">No ingredients added to this phase yet.</p>
                )}
                {phase.ingredients.map((ingredient) => (
                    <IngredientRow 
                        key={ingredient.id}
                        phaseId={phase.id}
                        ingredient={ingredient}
                        onUpdate={(updatedIng: FrontendPhaseIngredient) => onUpdateIngredient(phase.id, updatedIng)}
                        onDelete={() => onDeleteIngredient(phase.id, String(ingredient.id))} 
                        ingredientsOptions={ingredientsOptions}
                        errors={errors}
                        mappedErrors={allMappedErrors[ingredient.id] || {}}
                    />
                ))}
            </div>
        </div>
    )
}