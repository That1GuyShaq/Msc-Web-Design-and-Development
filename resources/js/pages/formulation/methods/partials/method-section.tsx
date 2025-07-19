"use client"

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Method } from "@/types/modules/formulation";

interface MethodSectionProps {
    method: Method;
    onUpdateMethod: (updatedMethod: Method) => void;
    onDeleteMethod: (methodIdToDelete: number) => void;
    errors: any; 
    mappedErrors: { [field: string]: string }; // Mapped errors for this specific method
}

export function MethodSection({ method, onUpdateMethod, onDeleteMethod, errors, mappedErrors }: MethodSectionProps) {
    const nameError = mappedErrors?.name;
    const descriptionError = mappedErrors?.description;

    return (
        <div className="grid grid-cols-1 mt-4 gap-2 border rounded-lg p-4">
            <div className="col-span-1 flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold">Method Step</h3>
                <Button type="button" variant="ghost" onClick={() => onDeleteMethod(method.id)} aria-label={`Delete method ${method.id}`}>
                    <Trash2 className="h-4 w-4 text-rose-900 hover:text-rose-600 dark:text-rose-600 dark:hover:text-rose-900 cursor-pointer" />
                </Button>
            </div>
            <div className="col-span-1">
                <Label htmlFor={`method-name-${method.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</Label>
                <Input
                    id={`method-name-${method.id}`}
                    type="text"
                    className="mt-1 block w-full"
                    value={method.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateMethod({ ...method, name: e.target.value })}
                />
                {nameError && <InputError message={nameError} className="mt-2" />}
            </div>
            <div className="col-span-1">
                <Label htmlFor={`method-description-${method.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
                <Textarea
                    id={`method-description-${method.id}`}
                    className="mt-1 block w-full"
                    value={method.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onUpdateMethod({ ...method, description: e.target.value })}
                />
                {descriptionError && <InputError message={descriptionError} className="mt-2" />}
            </div>
        </div>
    );
}
