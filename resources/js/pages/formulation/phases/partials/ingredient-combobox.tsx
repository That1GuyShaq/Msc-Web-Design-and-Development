
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { IngredientComboboxProps } from "@/types/modules/formulation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export default function IngredientCombobox({ value, onValueChange, ingredients, placeholder, id }: IngredientComboboxProps) {

    const [open, setOpen] = useState(false);
    const selectedOption = ingredients.find((ingredient) => ingredient.id === value);

    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    role="combobox" 
                    aria-expanded={open} 
                    className="w-full justify-between text-left font-normal" 
                    id={id}
                >
                    {selectedOption ? selectedOption.inci_name : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-100 p-0">
                <Command>
                    <CommandInput placeholder="Search ingredients..." />
                    <CommandList>
                        <CommandEmpty>No ingredient found.</CommandEmpty>
                        <CommandGroup>
                        {ingredients.map((ingredient) => (
                            <CommandItem
                                key={ingredient.id}
                                value={ingredient.inci_name}
                                onSelect={() => {
                                    onValueChange(Number(ingredient.id));
                                    setOpen(false);
                                }}
                                className="justify-between"
                            >
                            {ingredient.inci_name}
                            <Check className={`mr-2 h-4 w-4" ${ingredient.id === value ? 'opacity-100' : 'opacity-0'}`} />
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}