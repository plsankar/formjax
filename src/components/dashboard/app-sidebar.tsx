"use client";

import * as React from "react";
import { HomeIcon, SendHorizonalIcon } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/dashboard/ui/sidebar";
import Logo from "../logo";
import { usePathname } from "next/navigation";

const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            items: [
                {
                    title: "Home",
                    icon: HomeIcon,
                    url: "/dashboard",
                },
                {
                    title: "Forms",
                    icon: SendHorizonalIcon,
                    url: "/dashboard/forms",
                },
            ],
        },
    ],
};

export function AppSidebar() {
    const [selectedVersion, setSelectedVersion] = React.useState(data.versions[0]);

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarGroup className="py-3">
                    <Logo className="h-8 mr-auto" />
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                {item.icon && <item.icon />}
                                                {item.title}
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
