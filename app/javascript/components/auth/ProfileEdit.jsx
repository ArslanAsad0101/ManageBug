import React from "react";
import { getCsrfToken } from "../../lib/csrf";

const ProfileEdit = ({ user }) => {
    const avatarUrl = user?.avatar_url;

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-4xl">

                <div className="mb-8">

                    <h1 className="mt-1 text-3xl font-bold text-gray-900">
                        Edit your profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Update your contact details and password.
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

                    <form
                        action="/users"
                        method="post"
                        encType="multipart/form-data"
                        className="space-y-6"
                    >
                        {/* Rails / Devise */}
                        <input
                            type="hidden"
                            name="authenticity_token"
                            value={getCsrfToken()}
                        />

                        <input
                            type="hidden"
                            name="_method"
                            value="put"
                        />

                        {/* <div className="flex items-center gap-5 border-b border-gray-200 pb-6">

                            <div>
                                <label
                                    htmlFor="user_avatar"
                                    className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-100"
                                >
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt="Profile avatar"
                                            className="h-80 w-80 object-cover"
                                        />
                                    ) : (
                                        <div className="text-center text-sm text-gray-500">
                                            Add photo
                                        </div>
                                    )}

                                    <div className="absolute inset-0 hidden items-center justify-center bg-black/40 text-sm font-medium text-white group-hover:flex">
                                        Change
                                    </div>
                                </label>

                                <input
                                    type="file"
                                    id="user_avatar"
                                    name="user[avatar]"
                                    accept="image/png,image/jpeg"
                                    className=""
                                />
                            </div>

                            <div>
                                <p className="text-lg font-semibold text-gray-900">
                                    {user?.name}
                                </p>


                            </div>
                        </div> */}

                        <div>
                            <label
                                htmlFor="user_name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                id="user_name"
                                name="user[name]"
                                defaultValue={user?.name || ""}
                                autoComplete="name"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="user_phone_number"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Mobile number
                            </label>

                            <input
                                type="tel"
                                id="user_phone_number"
                                name="user[phone_number]"
                                defaultValue={user?.phone_number || ""}
                                autoComplete="tel"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="user_email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                id="user_email"
                                name="user[email]"
                                defaultValue={user?.email || ""}
                                autoComplete="email"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="user_password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <p className="mb-2 text-xs text-gray-500">
                                Leave blank if unchanged.
                            </p>

                            <input
                                type="password"
                                id="user_password"
                                name="user[password]"
                                autoComplete="new-password"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="user_password_confirmation"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password confirmation
                            </label>

                            <input
                                type="password"
                                id="user_password_confirmation"
                                name="user[password_confirmation]"
                                autoComplete="new-password"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="user_current_password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Current password
                            </label>

                            <p className="mb-2 text-xs text-gray-500">
                                Required to save changes.
                            </p>

                            <input
                                type="password"
                                id="user_current_password"
                                name="user[current_password]"
                                autoComplete="current-password"
                                className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-6">

                            <a
                                href="/projects"
                                className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </a>

                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Confirm
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
