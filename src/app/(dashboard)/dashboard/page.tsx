import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard/ui/card";
import { getCurrentUser, getUserFormsCount_Raw, getUserSubmissionsCountForCurrentMonth_Raw, getUserSubmissionsCountForLastMonth_Raw } from "@/lib/db";

import UsageDashBox from "@/components/dashboard/dashbox/usage-dash-box";
import db from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const sesstion = await getServerSession();
    const user = await getCurrentUser(sesstion);

    if (!user) {
        redirect("/");
    }

    const [monthyUsageCurrentMonth, monthyUsageLastMonth, totalForms] = await db.$transaction([
        getUserSubmissionsCountForCurrentMonth_Raw(user.id),
        getUserSubmissionsCountForLastMonth_Raw(user.id),
        getUserFormsCount_Raw(user.id),
    ]);

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 items-center">
            <main className="flex-1 items-start p-4 sm:px-6 sm:py-0 max-w-screen-2xl w-full">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card x-chunk="dashboard-05-chunk-1">
                            <CardHeader className="pb-2">
                                <CardDescription>Forms</CardDescription>
                                <CardTitle className="text-4xl">{totalForms}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">from last week</div>
                            </CardContent>
                        </Card>
                        <UsageDashBox currentMonth={monthyUsageCurrentMonth} lastMonth={monthyUsageLastMonth} />
                    </div>
                </div>
            </main>
        </div>
    );
}
