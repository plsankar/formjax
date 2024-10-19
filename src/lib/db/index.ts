import { PrismaPromise, User } from "@prisma/client";

import { Session } from "next-auth";
import db from "./db";

export const getCurrentUser = async (session: Session | null): Promise<User | null> => {
    if (!session || !session.user) return null;
    const user = await db.user.findFirst({
        where: {
            email: session.user.email,
        },
    });

    // if (user == null) {
    //     // means user has been removed from database but has a valid JWT.
    //     // todo: singout user;
    //     redirect("/auth/signout");
    // }

    return user;
};

export async function getUserById(userId: string): Promise<User | null> {
    return await db.user.findFirst({
        where: {
            id: userId,
        },
    });
}

export async function getUserSubmissionsCountForCurrentMonth(userId: string) {
    return await getUserSubmissionsCountForCurrentMonth_Raw(userId);
}

export function getUserSubmissionsCountForCurrentMonth_Raw(userId: string): PrismaPromise<number> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return db.submission.count({
        where: {
            form: {
                userId: userId,
            },
            createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
            },
        },
    });
}

export function getUserSubmissionsCountForLastMonth_Raw(userId: string): PrismaPromise<number> {
    const currentDate = new Date();
    const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const endOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    return db.submission.count({
        where: {
            form: {
                userId: userId,
            },
            createdAt: {
                gte: startOfLastMonth,
                lte: endOfLastMonth,
            },
        },
    });
}

export async function getUserFormsCount(userId: string) {
    return await getUserFormsCount_Raw(userId);
}

export function getUserFormsCount_Raw(userId: string): PrismaPromise<number> {
    return db.form.count({
        where: {
            userId: userId,
        },
    });
}
