"use client"

import { type Auth } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, CircleSmall } from "lucide-react";
import { type Formula } from "@/types/modules/formulation";


export const formulaColumns: ColumnDef<Formula>[] = [
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
					<Link href={route('formulation.formulas.show', [tenant, slug])} className="font-semibold text-nowrap flex items-center text-primary">
						{name}
					</Link>
				</div>
			)
		},
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
		accessorKey: "states",
		header: ({ column }) => {
			return (
				<Button variant="ghost" className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Status
					<span>
						{column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
					</span>
				</Button>
			)
		},
        cell: ({row}) => {
			const status  = row.original.status as string;
			const [color, text] = status === 'draft' ? ['text-amber-500 animate-pulse', 'Draft'] : status === 'published' ? ['text-green-500', 'Published'] : ['text-red-500', 'Archived'];
			return (
				<p className="flex items-center gap-2 text-ellipsis text-muted-foreground text-wrap">
					<Badge variant="outline">
						<CircleSmall className={`h-4 w-4 ${color} fill-current`} />{text}
					</Badge>
				</p>
			)
		}
	},
	{
		accessorKey: "version",
		header: "Version",
        cell: ({row}) => {
			const version  = row.original.version as string;
		
			return (
				<p className="flex items-center gap-2 text-muted-foreground text-wrap">
					v{version}
				</p>
			)
		}
	},
	{
		accessorKey: "created_At",
		header: ({ column }) => {
			return (
				<Button variant="ghost" className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Created At
					<span>
						{column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
					</span>
				</Button>
			)
		},
        cell: ({row}) => {
			const created = row.original.created_at as string;
			return (
				<p className="flex items-center gap-2 text-ellipsis text-muted-foreground text-wrap">
					{created}
				</p>
			)
		}
	},
]