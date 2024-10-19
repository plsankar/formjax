"use client";

import { GearSix, House, PaperPlaneTilt } from "@phosphor-icons/react";

import { SidebarMenuItem as Item } from "./sidebar-menu-item";
import Link from "next/link";
import { Package2 } from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-18 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Item href="/dashboard" icon={House} title="Dashboard"></Item>
                <Item href="/dashboard/forms" title="Forms" icon={PaperPlaneTilt}></Item>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <Item href="/dashboard/settings" title="Settings" icon={GearSix}></Item>
            </nav>
        </aside>
    );
};

export default Sidebar;
