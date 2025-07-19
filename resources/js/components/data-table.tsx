"use client"

import { useState, JSX } from "react";
import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, ColumnFiltersState, getSortedRowModel, SortingState, getFilteredRowModel, FilterFn } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    data: TData[];
    create?: boolean;
    className?: string;
    columns: ColumnDef<TData, TValue>[];
    link?: { name: string; href: string; };
    dialog?:  JSX.Element;
    rows?: number
    actions?: boolean
}

export function DataTable<TData, TValue>({ className, columns, data, link, create = true, dialog, rows = 7, actions = true }: DataTableProps<TData, TValue>) {
    

    const [globalFilter, setGlobalFilter]   = useState("");
    const [sorting, setSorting]             = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination]       = useState({ pageIndex: 0,  pageSize: rows});

    const filterContains: FilterFn<any> = (row, columnId, filterValue) => {
        const cellValue = row.original[columnId];

        if (Array.isArray(cellValue)) {
            return cellValue.some((item) =>
                item.toString().toLowerCase().includes(filterValue.toLowerCase())
            );
        } else {
            return cellValue ? cellValue.toString().toLowerCase().includes(filterValue.toLowerCase()) : false;
        }
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            globalFilter,
            columnFilters,
            pagination,
            columnVisibility: {
                id:false,
                actions: actions
            }
        },
        globalFilterFn: filterContains
    });

    return (
        <div className={className}>
            <Card className="col-span-1">
                <CardContent className='p-2'>
                    <div className="flex items-center justify-between pb-4">
                        <TooltipProvider>
                            <Tooltip  delayDuration={100} >
                                <TooltipTrigger asChild>
                                    <Input
                                        type="search"
                                        className="max-w-sm"
                                        placeholder="Search..."
                                        value={globalFilter ?? ""}
                                        onChange={(event) => setGlobalFilter(event.target.value)}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Search by mulitple tags with a comma</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {create && (
                            link ? (
                                <Button variant='ghost' asChild>
                                    <Link className="text-sm" href={link?.href}>
                                        <Plus size={20} />{link?.name}
                                    </Link>
                                </Button>
                            ) : dialog ? (
                                dialog
                            ) : null
                        )}
                    </div>
                    <Table className="h-full">
                        <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender( header.column.columnDef.header, header.getContext() )}
                                </TableHead>
                                )
                            })}
                            </TableRow>
                        ))}
                        </TableHeader>
                        <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                                ))}
                            </TableRow>
                            ))
                        ) : (
                            <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>

                    <Pagination className="space-x-2 pt-4">
                        <PaginationContent className="w-full flex justify-between">
                            <div className="flex items-center">
                                <PaginationItem className="flex items-center  text-sm opacity-50">
                                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                                    {table.getPageCount()}
                                </PaginationItem>
                            </div>
                            <div className="flex items-center">
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); table.previousPage() }} />
                                </PaginationItem>
                                {table.getPageOptions().map((page, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            isActive={table.getState().pagination.pageIndex === page}
                                            onClick={(e) => { e.preventDefault(); table.setPageIndex(page) }}
                                        >
                                            {page + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); table.getState().pagination.pageIndex === table.getPageCount() - 1 ? null : table.nextPage() }}
                                        // className={table.getState().pagination.pageIndex === table.getPageCount() - 1 ? 'hover:bg-transparent hover:cursor-default' : undefined}
                                    />
                                </PaginationItem>
                            </div>
                        </PaginationContent>
                    </Pagination>

                </CardContent>
            </Card>
        </div>
    )
}