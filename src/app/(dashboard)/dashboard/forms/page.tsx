import { DataTable } from "@/components/dashboard/data-table/data-table";
import { DataTableFilterField } from "@/components/dashboard/data-table/data-table-filter";
import { FormStatus } from "@prisma/client";
import { FormWithRelations } from "@/types";
import db from "@/lib/db/db";
import { formsTableColumns } from "./columns";
import { getCurrentUser } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const sesstion = await getServerSession();
    const user = await getCurrentUser(sesstion);

    if (!user) {
        redirect("/");
    }

    const forms = await db.form.findMany({
        where: {
            userId: user.id,
        },
        include: {
            submissions: true,
            tags: true,
        },
    });

    const filterFields: DataTableFilterField<FormWithRelations>[] = [
        {
            label: "Email",
            value: "email",
            placeholder: "Filter email...",
        },
        {
            label: "Status",
            value: "status",
            options: Object.values<string>(FormStatus).map((status) => ({
                label: String(status[0] + status.slice(1).toLowerCase()),
                value: String(status),
                withCount: true,
            })),
        },
    ];

    if (!forms) {
        return null;
    }

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 items-center">
            <main className="flex-1 items-start p-4 sm:px-6 sm:py-0 max-w-screen-2xl w-full">
                <DataTable data={forms} columns={formsTableColumns} filter={filterFields} />
            </main>
        </div>
    );
}
