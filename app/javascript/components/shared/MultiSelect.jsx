import React, { useState } from "react";

export default function MultiSelect({ label, users, selectedIds, onChange }) {
    const [open, setOpen] = useState(false);
    const selectedUsers = users.filter((user) => selectedIds.includes(user.id));

    const toggleId = (id) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((value) => value !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div className="relative space-y-3">
            <label className="block text-sm font-semibold text-slate-900">{label}</label>
            <button
                type="button"
                className="flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition hover:border-slate-300"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>
                    {selectedUsers.length > 0
                        ? `${selectedUsers.length} selected`
                        : `Select ${label}`}
                </span>
                <span className="text-lg leading-none text-slate-400">▾</span>
            </button>

            {selectedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedUsers.map((user) => (
                        <span key={user.id} className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                            {user.name}
                        </span>
                    ))}
                </div>
            )}

            {open && (
                <div className="absolute left-0 right-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-lg">
                    {users.length === 0 ? (
                        <p className="rounded-2xl px-4 py-3 text-sm text-slate-500">No users available.</p>
                    ) : (
                        users.map((user) => (
                            <label
                                key={user.id}
                                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(user.id)}
                                    onChange={() => toggleId(user.id)}
                                    className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span>{user.name}</span>
                            </label>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
