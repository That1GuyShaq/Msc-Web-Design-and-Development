
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import IngredientCombobox from "./ingredient-combobox";
import { IngredientRowProps } from "@/types/modules/formulation";

export default function IngredientRow({ ingredient, phaseId, onUpdate, onDelete, ingredientsOptions, errors, mappedErrors }: IngredientRowProps) {
    
    return (
        <div className="items-start gap-4 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 w-full sm:w-auto">
                    <Label htmlFor={`ingredient-${phaseId}-${ingredient.id}`} className="sr-only">Ingredient</Label>
                    <IngredientCombobox
                        id={`ingredient-${phaseId}-${ingredient.id}`}
                        value={ingredient.ingredient_id}
                        onValueChange={(value: number | null) => {
                            const selectedIngredient = ingredientsOptions.find(option => option.id === value);
                            onUpdate({...ingredient,
                                ingredient_id: value,
                                name: selectedIngredient?.name || '',
                                inci_name: selectedIngredient?.inci_name || ''
                            });
                        }}
                        ingredients={ingredientsOptions}
                        placeholder="Select ingredient..."
                    />
                </div>

                <div className="flex-none w-full sm:w-32">
                    <Label htmlFor={`weight-${phaseId}-${ingredient.id}`} className="sr-only">Weight per Weight (%)</Label>
                    <div className="relative">
                        <Input
                            id={`weight-${phaseId}-${ingredient.id}`}
                            type="number"
                            step="0.001"
                            min="0"
                            className="w-full pr-8"
                            value={ingredient.percentage_weight_per_weight || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate({ ...ingredient, percentage_weight_per_weight: parseFloat(e.target.value) || null })}
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground text-sm">%</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-none">
                    <Checkbox
                        id={`qs-${phaseId}-${ingredient.id}`}
                        checked={ingredient.quantity_sufficient}
                        onCheckedChange={(checked: boolean) => onUpdate({ ...ingredient, quantity_sufficient: checked })}
                    />
                    <Label htmlFor={`qs-${phaseId}-${ingredient.id}`} className="text-sm">Quantity Sufficient</Label>
                </div>
                
                <Button variant="ghost" onClick={onDelete} type="button">
                    <Trash2 className="h-4 w-4 text-rose-900 hover:text-rose-600 dark:text-rose-600 dark:hover:text-rose-900 cursor-pointer" />
                </Button>
            </div>

            {mappedErrors && <ul className="pt-2 ps-4 text-sm text-red-600 dark:text-red-400 list-disc">
                {mappedErrors?.ingredient_id && <li>
                    <InputError message={mappedErrors?.ingredient_id} />
                </li>}
                {mappedErrors?.percentage_weight_per_weight && <li>
                    <InputError message={mappedErrors?.percentage_weight_per_weight} />
                </li>}
                {mappedErrors?.quantity_sufficient && <li>
                    <InputError message={mappedErrors?.quantity_sufficient} />
                </li>}
            </ul>}
        </div>
    )
}