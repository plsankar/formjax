"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/dashboard/ui/card";

import { Progress } from "@/components/dashboard/ui/progress";
import React from "react";

const UsageDashBox: React.FC<{ currentMonth: number; lastMonth: number }> = ({ currentMonth, lastMonth }) => {
    const diff = currentMonth - lastMonth;
    const percentageChange = lastMonth === 0 ? (diff > 0 ? 100 : 0) : ((diff / lastMonth) * 100).toFixed(2);
    return (
        <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
                <CardDescription>Submissions</CardDescription>
                <CardTitle className="text-4xl">{currentMonth}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-muted-foreground">
                    {diff >= 0 ? "+" : "-"}
                    {percentageChange}% from last month
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full">
                    <Progress value={(currentMonth / 100) * 100} />
                    <div className="text-xs text-muted-foreground">{100 - currentMonth} Left</div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default UsageDashBox;
