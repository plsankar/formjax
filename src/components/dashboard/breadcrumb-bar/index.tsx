import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/dashboard/ui/breadcrumb";
import React, { FC } from "react";

import Link from "next/link";

const BreadcrumbBar: FC<{
    items: BreadcrumbOptionItem[];
}> = ({ items }) => {
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {items.map((item, index) => (
                    <>
                        {index == items.length - 1 ? (
                            <BreadcrumbItem key={`beradcrumb-${index}`}>
                                <BreadcrumbPage>{item.text}</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : (
                            <BreadcrumbItem key={`beradcrumb-${index}`}>
                                <BreadcrumbLink asChild>
                                    <Link href={item.link}>{item.text}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )}
                        {index != items.length - 1 ? <BreadcrumbSeparator key={`beradcrumb-${index}`} /> : null}
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbBar;
