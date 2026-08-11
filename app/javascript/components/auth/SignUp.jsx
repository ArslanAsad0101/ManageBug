import React from "react";
import { getCsrfToken } from "../../lib/csrf";

const SignUp = ({ image_url }) => {
  const params = new URLSearchParams(window.location.search);
  const selectedRole = params.get("role") || "developer";

  const formattedRole =
    selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Left Image */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src={image_url}
          alt="ManageBug"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Signup Form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
            <p className="mt-2 text-sm text-gray-500">
              Please fill your information below
            </p>
          </div>

          {/* Form */}
          <form action="/users" method="post" className="space-y-4">
            {/* CSRF */}
            <input
              type="hidden"
              name="authenticity_token"
              value={getCsrfToken()}
            />

            {/* Name */}
            <div>
              <label
                htmlFor="user_name"
                className="block mb-1.5 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user[name]"
                autoComplete="name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="user_phone_number"
                className="block mb-1.5 text-sm font-medium text-gray-700"
              >
                Mobile number
              </label>
              <input
                type="tel"
                id="user_phone_number"
                name="user[phone_number]"
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="15"
                placeholder="Enter digits only"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                You are signing up as{" "}
                <strong className="font-semibold text-gray-900">
                  {formattedRole}
                </strong>
              </div>
              <input type="hidden" name="user[role]" value={selectedRole} />
            </div>

            {/* Email */}
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
                autoComplete="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
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
                autoComplete="new-password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="user_password_confirmation"
                className="block mb-1.5 text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="user_password_confirmation"
                name="user[password_confirmation]"
                autoComplete="new-password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;