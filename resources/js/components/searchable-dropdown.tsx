
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
interface SearchableDropdownProps {
  items: { id: string; name: string }[];
  selected: string;
  onSelect: (val: string) => void;
  disabled: boolean;
  label: string;
  isLoading?: boolean;
  emptyMsg?: string;
}

export function SearchableDropdown({ items, selected, onSelect, disabled, label, isLoading = false, emptyMsg = "No options", }: SearchableDropdownProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" disabled={disabled} role="combobox">
          {isLoading
            ? <><Loader2 className="animate-spin mr-2 h-4 w-4"/> Loading…</>
            : selected || (items.length ? label : emptyMsg)
          }
        </Button>
      </PopoverTrigger>
    <PopoverContent className="p-0">
        <Command>
            <CommandInput placeholder={`Search ${label}`} />
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
                {items.map((opt) => (
                    <CommandItem key={opt.id} onSelect={() => onSelect(opt.name)} >
                            {opt.name}
                    </CommandItem>
                ))}
            </CommandGroup>
        </Command>
    </PopoverContent>
    </Popover>
  );
}
