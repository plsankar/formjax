"use client";

import React, { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/dashboard/ui/tooltip";

import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

export const SidebarMenuItem: FC<ComponentPropsWithoutRef<typeof Link> & { icon: Icon }> = ({ children, title, icon: Icon, ...props }) => {
    const pathname = usePathname();
    const active = useMemo(() => pathname === props.href, [pathname, props.href]);
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        className={twMerge(
                            "flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors",
                            !active && "hover:text-foreground",
                            active && "bg-foreground text-background"
                        )}
                        {...props}
                    >
                        <Icon size={32} className="h-5 w-5" />
                        <span className="sr-only">{title}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{title}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
