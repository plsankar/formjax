import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import HeroHome from "@/components/landing/home/hero-home";

export default async function Home() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <HeroHome />
            {/* <div className="p-3 flex justify-center min-h-screen items-center text-center flex-col">
                <InstantForm />
                <div className="space-y-4">
                    {!session ? (
                        <div>
                            <p>You must be logged in.</p>
                            <Button asChild>
                                <Link href="/auth/login">Login</Link>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <p>Welcome {session.user?.name}</p>
                            <Button asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/auth/logout">Logout</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div> */}
        </>
    );
}
