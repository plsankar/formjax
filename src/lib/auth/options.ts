import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "../db/db";

export const authOptions: AuthOptions = {
    debug: true,
    adapter: PrismaAdapter(db) as any,
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
    },
    events: {
        async createUser({ user }) {
            console.log(`User created ${user}`);
        },
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        GitHubProvider({
            clientId: String(process.env.GITHUB_CLIENT_ID),
            clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};
