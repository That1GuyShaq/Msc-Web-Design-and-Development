"use client"

import { type Auth } from "@/types";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { type Supplier } from "@/types/modules/inventory";
import { ArrowDown, ArrowUp, ExternalLink, Mail } from "lucide-react";


export const columns: ColumnDef<Supplier>[] = [
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
					<Link href={route('inventory.suppliers.show', [tenant, slug])} className="font-semibold text-nowrap flex items-center text-primary">
						{name}
					</Link>
				</div>
			)
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({row}) => {
			const email  = row.original.email as string;
			return (
				<div className="flex items-center gap-2">
					<a href={"mailto:" + email + ""} className="text-nowrap flex items-center text-primary hover:text-muted-foreground">
						<Mail className="mr-2 h-4 w-4" /> 
                        <span className="hover:text-primary">{email}</span>
					</a>
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
		accessorKey: "website",
		header: "Website",
		cell: ({row}) => {
			const website  = row.original.website as string;
			return (
				<div className="flex items-center gap-2">
					<a href={website} target="_blank" className="text-nowrap flex items-center text-primary hover:text-muted-foreground">
						<span className="hover:text-primary">Visit Website</span> <ExternalLink className="ml-2 h-4 w-4" />
					</a>
				</div>
			)
		}
	},
]