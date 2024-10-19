"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

type SearchParams = {
    [key: string]: string | string[] | undefined;
};

const SearchParamsSchema = z.object({
    message: z.string().min(1),
});

export default function Page({ searchParams }: { searchParams: SearchParams }) {
    let message = "We hit a snag. Please attempt your request again.";
    try {
        const _searchParams = SearchParamsSchema.parse(searchParams);
        message = _searchParams.message;
    } catch (error) {
        // ignore
    }

    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Oops!</h1>
                <p className="mt-4 text-lg">{message}</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="btn group mb-4 w-full bg-gradient-to-t from-emerald-600 to-emerald-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
