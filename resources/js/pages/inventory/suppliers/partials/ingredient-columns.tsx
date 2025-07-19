"use client"

import { type Auth } from "@/types";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { type SupplierIngredient } from "@/types/modules/inventory";
import { ArrowDown, ArrowUp, Microscope, Trash2, Edit, ExternalLink } from "lucide-react";
import SupplierIngredientDialog from "@/pages/inventory/suppliers/partials/ingredient-dialog";
import { Separator } from "@/components/ui/separator";

export const columns: ColumnDef<SupplierIngredient>[] = [
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
		accessorKey: "state_of_matter",
		header: "State of Matter",
		cell: ({row}) => {
			const state_of_matter  = row.original.state_of_matter as string;
            
			return (
				<p className="flex items-center gap-2 text-muted-foreground capitalize">
                    {state_of_matter}
				</p>
			)
		}
	},
	{
		accessorKey: "cas_number",
		header: "CAS Number",
		cell: ({row}) => {
			const cas_number  = row.original.cas_number as string;
			return (
				<p className="flex items-center gap-2 text-muted-foreground">
					{cas_number}
				</p>
			)
		}
	},
	{
		accessorKey: "ec_number",
		header: "EC Number",
		cell: ({row}) => {
			const ec_number  = row.original.ec_number as string;
			return (
				<p className="flex items-center gap-2 text-muted-foreground">
					{ec_number}
				</p>
			)
		}
	},
	{
		accessorKey: "cost_per_unit",
		header: "Cost per Unit",
        cell: ({row}) => {
			const symbol = row.original.symbol as string;
			const cost_per_unit = row.original.cost_per_unit as string;
			return (
				<p className="flex items-center gap-2 ">
					{symbol + ' ' + cost_per_unit}
				</p>
			)
		}
	},
	{
		accessorKey: "unit",
		header: "Unit",
		cell: ({row}) => {
			const unit  = row.original.unit as string;
			return (
				<p className="flex items-center gap-2 capitalize">
					{unit}
				</p>
			)
		}
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({row}) => {
			const auth = usePage<{ auth: Auth }>().props.auth;
			const tenant = auth.tenant;
			const id = row.original.id;
			const url = row.original.url;
			const slug = row.original.supplier_slug;
			
			const canView = ['read ingredient'].every(permission => auth.permissions.includes(permission));
			const canEdit = ['update ingredient', 'update supplier'].every(permission => auth.permissions.includes(permission));
			const canDelete = ['delete ingredient', 'update supplier'].every(permission => auth.permissions.includes(permission));
			return (
				<div className="flex items-center gap-2">
					{canView &&
						<div className=" flex flex-row items-center gap-2 h-4">
							<a href={url} className="font-semibold text-nowrap flex items-center text-primary hover:text-muted-foreground">
							<ExternalLink className="h-4 w-4 cursor-pointer" />
							</a>
							<Separator orientation="vertical" className=" dark:bg-neutral-700" />
						</div>
					}
					{canEdit && 
						<SupplierIngredientDialog tenant={tenant} slug={slug} editing={true} unlistedIngredients={[]} supplierIngredient={row.original} key={row.original.id} />}
					{canDelete && 
						<Link method="delete" href={route('inventory.suppliers.ingredients.destroy', [tenant.id, slug, id])} className="font-semibold text-nowrap flex items-center text-primary hover:text-muted-foreground">
							<Trash2 className="h-4 w-4 text-rose-900 hover:text-rose-600 dark:text-rose-600 dark:hover:text-rose-900 cursor-pointer" />
						</Link>}
				</div>
			)
		}
	}
]