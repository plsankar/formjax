import React, { FC } from "react";

import BreadcrumbBar from "@/components/dashboard/breadcrumb-bar";
import { Input } from "@/components/dashboard/ui/input";
import { Search } from "lucide-react";
import SidebarMobileToggle from "@/components/dashboard/sidebar/sidebar-mobile-toggle";
import UserProfile from "@/components/dashboard/user/profile";

const DashHeader: FC<{ breadcrumbItems: BreadcrumbOptionItem[] }> = ({ breadcrumbItems }) => {
    return (
        <header className="sticky top-0 z-30 w-full h-14 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent">
            <div className="container flex items-center gap-4 px-4 sm:px-6 mb-3">
                <SidebarMobileToggle />
                <BreadcrumbBar items={breadcrumbItems} />
                <div className="relative ml-auto flex-1 md:grow-0 items-center">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search..." className="text-xs w-full rounded-lg bg-background pl-8 md:w-[200px]" />
                </div>
                <UserProfile />
            </div>
        </header>
    );
};

export default DashHeader;
