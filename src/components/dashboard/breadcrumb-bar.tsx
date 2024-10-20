"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/dashboard/ui/breadcrumb";

const BreadcrumbBar = () => {
    const paths = usePathname();
    const pathNames = paths
        .replace("/dashboard", "")
        .split("/")
        .filter((path) => path);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={"/dashboard"}>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {pathNames.length > 0 && <BreadcrumbSeparator />}
                {pathNames.map((link, index) => {
                    let href = `/dashboard/${pathNames.slice(0, index + 1).join("/")}`;
                    let active = paths === href;
                    let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>{active ? <BreadcrumbPage>{itemLink}</BreadcrumbPage> : <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>}</BreadcrumbItem>
                            {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbBar;
