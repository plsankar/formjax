"use client";

import { Button } from "../ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "../ui/input";
import { ReactNode } from "react";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    children?: ReactNode;
}

export function DataTableToolbar<TData>({ table, children }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {children}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
