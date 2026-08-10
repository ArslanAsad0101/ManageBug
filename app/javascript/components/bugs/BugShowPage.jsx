import React from "react";
import { getCsrfToken } from "../../lib/csrf";

const statusStyles = {
    pending: "bg-slate-100 text-slate-800",
    started: "bg-sky-100 text-sky-800",
    completed: "bg-emerald-100 text-emerald-800",
};

function getStatusClass(status) {
    if (!status) return "bg-slate-100 text-slate-800";
    return statusStyles[status.toString().toLowerCase()] || "bg-slate-100 text-slate-800";
}

export default function BugShowPage({ bug }) {
    if (!bug) return <p className="text-center py-16 text-slate-500">Loading bug...</p>;

    async function handleDelete() {
        if (!window.confirm("Are you sure?")) return;

        const res = await fetch(`/projects/${bug.project_id}/bugs/${bug.id}`, {
            method: "DELETE",
            headers: { Accept: "application/json", "X-CSRF-Token": getCsrfToken() },
        });

        if (res.ok) {
            window.location.href = `/projects/${bug.project_id}`;
        } else {
            window.alert("Unable to delete this bug.");
        }
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{bug.title}</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Bug #{bug.id} in <span className="font-semibold">{bug.project_name}</span>
                    </p>
                </div>
                <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(bug.status)}`}>
                    {bug.status_label}
                </span>
            </div>

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
                <section className="space-y-6">
                    {bug.screenshot_url && (
                        <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                            <img src={bug.screenshot_url} alt={bug.title} className="h-[400px] w-full rounded-2xl object-cover" />
                        </div>
                    )}

                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Description</h3>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {bug.description || "No description provided."}
                        </p>
                    </div>

                    <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2">
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Type</p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">{bug.bug_type}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Deadline</p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">{bug.deadline || "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Developer</p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">{bug.developer?.name || "Unassigned"}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Reporter</p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">{bug.reporter?.name}</p>
                        </div>
                    </div>
                </section>

                <aside className="space-y-4">
                    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Project</p>
                        <a href={`/projects/${bug.project_id}`} className="mt-2 block text-sm font-semibold text-sky-600 hover:underline">
                            {bug.project_name}
                        </a>
                    </div>

                    <div className="flex flex-col gap-2">
                        {bug.permissions?.edit && (

                            <a href={`/projects/${bug.project_id}/bugs/${bug.id}/edit`}
                                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                            >
                                Edit Bug
                            </a>
                        )}
                        {bug.permissions?.destroy && (
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                            >
                                Delete Bug
                            </button>
                        )}

                        <a href="/bugs"
                            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            ← Back to Bugs
                        </a>
                    </div>
                </aside>
            </div >
        </div >
    );
}