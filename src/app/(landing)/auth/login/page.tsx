import SigninOptions from "./signin-options";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard");
    }
    return (
        <div className="bg-gray-50">
            <main className="w-screen h-screen flex justify-center items-center">
                <div className="relative h-fit p-1 bg-white rounded-lg border max-w-sm w-full shadow-sm">
                    <SigninOptions />
                    <div className="bg-gray-100 p-4 rounded-lg mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <a href="/examples/forms/register1" className="text-blue-500 hover:underline">
                                Create account
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
