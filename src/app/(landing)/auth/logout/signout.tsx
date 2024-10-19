"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Signout = () => {
    useEffect(() => {
        signOut({
            redirect: true,
        });
    }, []);
    return null;
};

export default Signout;
