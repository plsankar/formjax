"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Oops!</h1>
                <p className="mt-4 text-lg text-gray-700">{message}</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button onClick={() => router.back()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
