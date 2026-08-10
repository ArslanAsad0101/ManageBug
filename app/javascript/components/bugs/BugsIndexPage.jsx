import React, { useEffect, useState } from "react";
import BugCard from "./BugCard";

export default function BugsIndexPage({ initialSearch, canCreate }) {
    const [bugs, setBugs] = useState([]);
    const [search, setSearch] = useState(initialSearch || "");
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("grid");

    useEffect(() => {
        const url = `/bugs.json${search ? `?search=${encodeURIComponent(search)}` : ""}`;
        fetch(url, { headers: { Accept: "application/json" } })
            .then((res) => res.json())
            .then((data) => setBugs(data))
            .finally(() => setLoading(false));
    }, [search]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-6 border border-slate-200 border-l-4 border-l-green-500 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">Bugs</p>
                    <h1 className="mt-1 text-xl font-semibold text-slate-900 sm:text-4xl">All Bugs</h1>
                    <p className="mt-1 max-w-lg text-sm leading-6 text-slate-600">
                        Track and manage bugs across your projects.
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <input
                        className="w-full min-w-[220px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:w-[320px]"
                        placeholder="Search for Bugs here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {canCreate && (
                        <a
                            href="/bugs/new"
                            className="inline-flex items-center justify-center bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                        >
                            + Add New Bug
                        </a>
                    )}
                </div>
            </div>

            <div className="mb-4 flex justify-end gap-2">
                <button
                    onClick={() => setView("list")}
                    className={`rounded-full border px-3 py-1.5 text-sm ${view === "list" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}
                >
                    ☰ List
                </button>
                <button
                    onClick={() => setView("grid")}
                    className={`rounded-full border px-3 py-1.5 text-sm ${view === "grid" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}
                >
                    ▦ Grid
                </button>
            </div>

            {
                loading ? (
                    <p className="text-sm text-slate-600">Loading...</p>
                ) : bugs.length === 0 ? (
                    <p className="text-sm text-slate-600">No bugs found.</p>
                ) : view === "grid" ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {bugs.map((bug) => (
                            <BugCard key={bug.id} bug={bug} />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                <tr>
                                    <th className="px-4 py-3">Bug details</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Due date</th>
                                    <th className="px-4 py-3">Assigned to</th>
                                    <th className="px-4 py-3">Project</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bugs.map((bug) => (
                                    <tr
                                        key={bug.id}
                                        className="cursor-pointer border-t border-slate-100 hover:bg-slate-50"
                                        onClick={() => (window.location.href = `/projects/${bug.project_id}/bugs/${bug.id}`)}
                                    >
                                        <td className="px-4 py-3 font-medium text-slate-900">{bug.title}</td>
                                        <td className="px-4 py-3">{bug.status_label}</td>
                                        <td className="px-4 py-3">{bug.deadline || "—"}</td>
                                        <td className="px-4 py-3">{bug.developer?.name || "Unassigned"}</td>
                                        <td className="px-4 py-3">{bug.project_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div >
    );
}