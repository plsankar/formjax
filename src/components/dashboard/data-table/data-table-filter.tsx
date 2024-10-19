"use client";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "../ui/input";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";

export interface DataTableFilterField<T> {
    label: string;
    value: keyof T;
    placeholder?: string;
    options?: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
        withCount?: boolean;
    }[];
}

interface DataTableFitlerProps<TData, T> {
    table: Table<TData>;
    filter: DataTableFilterField<T>[];
}

export function DataTableFitler<TData, T>({ table, filter }: DataTableFitlerProps<TData, T>) {
    const { searchableColumns, filterableColumns } = useMemo(() => {
        return {
            searchableColumns: filter.filter((field) => !field.options),
            filterableColumns: filter.filter((field) => field.options),
        };
    }, [filter]);

    return (
        <>
            {searchableColumns.length > 0 &&
                searchableColumns.map(
                    (column) =>
                        table.getColumn(column.value ? String(column.value) : "") && (
                            <Input
                                key={String(column.value)}
                                placeholder={column.placeholder}
                                value={(table.getColumn(String(column.value))?.getFilterValue() as string) ?? ""}
                                onChange={(event) => table.getColumn(String(column.value))?.setFilterValue(event.target.value)}
                                className="h-8 w-[150px] lg:w-[250px]"
                            />
                        )
                )}
            {filterableColumns.length > 0 &&
                filterableColumns.map(
                    (column) =>
                        column.options && (
                            <DataTableFacetedFilter key={String(column.value)} column={table.getColumn(String(column.value))} title={column.label} options={column.options} />
                        )
                )}
        </>
    );
}
