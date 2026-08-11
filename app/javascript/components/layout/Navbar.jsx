import React from "react";

const Navbar = ({ user }) => {
    return (
        <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">

                <div className="flex items-center">
                    <div className="text-xl font-bold text-gray-900">
                        ManageBug
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <a
                        href="/projects"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                    >
                        Projects
                    </a>

                    <a
                        href="/bugs"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                    >
                        Bug
                    </a>
                </div>

                <div className="flex items-center gap-5">

                    <a
                        href="/users/edit"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                    >
                        {user?.name}
                    </a>

                    <a
                        href="/users/sign_out"
                        data-turbo-method="delete"
                        className="text-sm font-medium text-gray-700 hover:text-red-600 transition"
                    >
                        Logout
                    </a>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
