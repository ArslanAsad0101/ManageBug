import React from "react";

const RoleSelection = ({ image_url }) => {
    return (
        <div className="min-h-screen w-full flex">
            {/* Left Side */}
            <div className="md:block md:w-1/2">
                <img
                    src={image_url}
                    alt="Login"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side */}
            <div className="w-full md:w-1/2 min-h-screen bg-white px-6 py-10">
                <div className="w-full max-w-md mx-auto">
                    {/* Top Link */}
                    <div className="flex justify-end items-center gap-2 mb-16 text-sm">
                        <span className="text-gray-500">
                            Already have an account?
                        </span>

                        <a
                            href="/users/sign_in"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Sign in
                        </a>
                    </div>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Join Us!
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            To begin this journey, tell us what type of account
                            you'd be opening.
                        </p>
                    </div>

                    {/* Role Cards */}
                    <div className="space-y-4">
                        {/* Manager */}
                        <a
                            href="/users/sign_up?role=manager"
                            className="block rounded-xl border border-gray-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
                        >
                            <div className="text-lg font-semibold text-gray-900">
                                Manager
                            </div>

                            <div className="mt-1 text-sm leading-5 text-gray-500">
                                Signup as a manager to manage the tasks and bugs.
                            </div>
                        </a>

                        {/* Developer */}
                        <a
                            href="/users/sign_up?role=developer"
                            className="block rounded-xl border border-gray-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
                        >
                            <div className="text-lg font-semibold text-gray-900">
                                Developer
                            </div>

                            <div className="mt-1 text-sm leading-5 text-gray-500">
                                Signup as a developer to assign the relevant task
                                to QA.
                            </div>
                        </a>

                        {/* QA */}
                        <a
                            href="/users/sign_up?role=qa"
                            className="block rounded-xl border border-gray-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
                        >
                            <div className="text-lg font-semibold text-gray-900">
                                QA
                            </div>

                            <div className="mt-1 text-sm leading-5 text-gray-500">
                                Signup as a QA to create bugs and report in tasks.
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
