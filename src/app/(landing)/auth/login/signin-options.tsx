"use client";

import { Button } from "@/components/dashboard/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";
import { signIn } from "next-auth/react";

const SigninOptions = () => {
    const handleOnLoginWithGithubClicked = async () => {
        await signIn("github");
    };

    return (
        <div className="p-10">
            <div>
                <h1 className="text-2xl font-bold mb-1">Sign In to Tailus UI</h1>
                <p className="text-sm text-gray-600">Welcome back! Sign in to continue</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                    onClick={handleOnLoginWithGithubClicked}
                    className="w-full flex items-center justify-center border bg-[#333] rounded-md py-2 px-4 text-sm text-white hover:bg-black"
                >
                    <GitHubLogoIcon className="w-4 h-4 mr-2" />
                    Google
                </button>
            </div>

            <form className="mx-auto mt-8 space-y-6">
                <div className="space-y-6 rounded-md shadow-sm shadow-gray-500/5">
                    <div className="relative my-6 grid items-center gap-3 grid-cols-[1fr_auto_1fr]">
                        <div className="h-px bg-gray-300"></div>
                        <span className="text-sm text-gray-600">Or continue with</span>
                        <div className="h-px bg-gray-300"></div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2.5">
                            <label for="email" className="block text-sm font-medium text-gray-700">
                                Your email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <a href="#" className="text-sm text-blue-500 hover:underline">
                                    Forgot your Password?
                                </a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SigninOptions;
