"use client"

import * as React from "react";
import { type Auth } from "@/types";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { type Ingredient } from "@/types/modules/inventory";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowDown, ArrowUp, Microscope, ChevronsUpDown, StoreIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export const columns: ColumnDef<Ingredient>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Name
					<span>
						{column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
					</span>
				</Button>
			)
		},
		cell: ({row}) => {
			const tenant = usePage<{ auth: Auth }>().props.auth.tenant.id as string;
			const slug  = row.original.slug as string;
			const name = row.original.name as string;
			return (
				<div className="flex items-center gap-2">
					<Link href={route('inventory.ingredients.show', [tenant, slug])} className="font-semibold text-nowrap flex items-center text-primary">
						{name}
					</Link>
				</div>
			)
		},
	},
	{
		accessorKey: "inci_name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					INCI Name
					<span>
						{column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
					</span>
				</Button>
			)
		},
		cell: ({row}) => {
			const tenant = usePage<{ auth: Auth }>().props.auth.tenant.id as string;
			const original = row.original;
			return (
				<div className="flex items-center gap-2">
					<Link href={route('inventory.ingredients.show', [tenant, original.slug])} className="font-semibold text-nowrap flex items-center text-primary hover:text-muted-foreground">
						<Microscope className="mr-4 h-4 w-4" />
						<span className="hover:text-primary">{original.inci_name}</span>
					</Link>
				</div>
			)
		}
	},
	{
		accessorKey: "description",
		header: "Description",
        cell: ({row}) => {
			const description  = row.original.description as string;
			return (
				<p className="flex items-center gap-2 text-ellipsis text-muted-foreground text-wrap">
					{description}
				</p>
			)
		}
	},
	{
		accessorKey: "state_of_matter",
		header: "State of Matter",
		cell: ({row}) => {
			const state_of_matter  = row.original.state_of_matter as string;
			return (
				<p className="capitalize flex items-center">
					{state_of_matter}
				</p>
			)
		}
	},
	{
		accessorKey: "cas_number",
		header: "CAS Number",
	},
	{
		accessorKey: "ec_number",
		header: "EC Number",
	},
	{
		accessorKey: "suppliers",
		header: "Suppliers",
		cell: ({row}) => {
			const suppliers  = row.original.suppliers;
  			const [value, setValue] = React.useState("");
			const [open, setOpen]   = React.useState(false);
			
			return (
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button variant="ghost" role="combobox" aria-expanded={open} className="justify-between" >
						<StoreIcon className="mr-2 h-4 w-4" /> Suppliers
						<span className="tesxt-sm">{suppliers.length}</span>
						<ChevronsUpDown className="opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0">
						<Command>
						<CommandInput placeholder="Search framework..." className="h-9" />
						<CommandList>
							<CommandEmpty>No supplier found.</CommandEmpty>
							<CommandGroup>
								{suppliers.map((supplier, Index) => (
									<CommandItem
										key={Index}
										value={supplier.url}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue)
											setOpen(false)
										}}
									>
									<a href={supplier.url} target="_blank" rel="noopener noreferrer">{supplier.name}</a>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
  			)
		}
	}
]