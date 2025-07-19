
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { IngredientRowProps, MethodRowProps } from "@/types/modules/formulation";

export default function IngredientRow({ method, onUpdateMethod, onDeleteMethod, errors }: MethodRowProps) {
    
    const handleInstructionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onUpdateMethod({ ...method, instruction: e.target.value });
    };

    return (
        <div className="flex items-start gap-4 p-4  mb-4">

            <div className="flex-shrink-0 mt-2">
                <span>Step {method.step}</span>
            </div>

            <div className="flex-grow">
                <Textarea
                    placeholder={`Enter instruction for Step ${method.step}`}
                    value={method.instruction}
                    onChange={handleInstructionChange}
                    className="min-h-[60px] resize-y"
                />
                {errors.instruction && ( <InputError message={errors.instruction} className="mt-1" /> )}
            </div>

            <div className="flex-shrink-0 mt-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteMethod(method.id)}
                    aria-label={`Delete Step ${method.step}`}
                >
                    <Trash2 className="h-4 w-4 text-rose-900 hover:text-rose-600 dark:text-rose-600 dark:hover:text-rose-900 cursor-pointer" />
                </Button>
            </div>
        </div>
    )
}