import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/dashboard/ui/dropdown-menu";

import { Button } from "@/components/dashboard/ui/button";
import Link from "next/link";
import React from "react";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

const UserProfile = async () => {
    const session = await getServerSession(authOptions);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                    {session?.user?.image && (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={session?.user?.image} width={36} height={36} alt="Avatar" className="overflow-hidden rounded-full" />
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`${authOptions.pages?.signOut}`}>Logout</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfile;
