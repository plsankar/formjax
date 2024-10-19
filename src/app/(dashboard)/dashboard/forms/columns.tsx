"use client";

import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/dashboard/ui/dropdown-menu";
import { FormStatus, Submission, Tag } from "@prisma/client";

import ApikeyBox from "@/components/dashboard/apikey-box";
import { Badge } from "@/components/dashboard/ui/badge";
import { Button } from "@/components/dashboard/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DataTableColumnHeader } from "@/components/dashboard/data-table/data-table-column-header";
import type { FormWithRelations } from "@/types";
import { MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";

export const formsTableColumns: ColumnDef<FormWithRelations>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "apiKey",
        header: "API Key",
        cell: ({ row }) => {
            return <ApikeyBox value={row.getValue("apiKey")} />;
        },
    },
    {
        accessorKey: "submissions",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Submissions" />,
        cell: ({ row }) => {
            return <>{(row.getValue("submissions") as Submission[]).length}</>;
        },
    },
    {
        accessorKey: "createdAt",
        cell: ({ row }) => {
            return <>{format(row.getValue("createdAt"), "dd MMM yyyy")}</>;
        },
        header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
        // header: ({ column }) => {
        //     return (
        //         <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        //             Created
        //             <ArrowUpDown className="ml-2 h-4 w-4" />
        //         </Button>
        //     );
        // },
        enableSorting: true,
        enableHiding: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = row.getValue("status") as FormStatus;
            return (
                <Badge variant={"outline"}>
                    <span
                        className={clsx(
                            "w-1.5 h-1.5 rounded-full mr-2",
                            status === "WORKING" && " bg-green-500",
                            status === "PAUSED" && " bg-yellow-500",
                            status === "ARCHIVED" && "bg-destructive"
                        )}
                    ></span>
                    <span className="opacity-60">{row.getValue("status")}</span>
                </Badge>
            );
        },
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    {(row.getValue("tags") as Tag[]).map((s) => (
                        <Badge key={s.id} variant="secondary">
                            <span>{s.name}</span>
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Copy payment ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
