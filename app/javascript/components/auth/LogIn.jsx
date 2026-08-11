import React from "react";
import { getCsrfToken } from "../../lib/csrf";

const LogIn = ({ image_url }) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white">
            <div className="md:block md:w-1/2 h-full">
                <img
                    src={image_url}
                    alt="Login"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 py-10 overflow-y-auto">
                <div className="flex flex-col justify-center w-full max-w-sm">
                    {/* Heading */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Log In
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Please fill your information below
                        </p>
                    </div>

                    <form
                        action="/users/sign_in"
                        method="post"
                        className="mt-8 space-y-4"
                    >
                        <input
                            type="hidden"
                            name="authenticity_token"
                            value={getCsrfToken()}
                        />

                        <div>
                            <label
                                htmlFor="user_email"
                                className="block mb-1.5 text-sm font-medium text-gray-700"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="user_email"
                                name="user[email]"
                                required
                                autoComplete="email"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="user_password"
                                className="block mb-1.5 text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="user_password"
                                name="user[password]"
                                required
                                autoComplete="current-password"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-blue-600 py-2.5 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;