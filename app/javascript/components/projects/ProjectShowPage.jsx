import React from "react";

const statusStyles = {
    started: "bg-sky-100 text-sky-800",
    in_progress: "bg-amber-100 text-amber-800",
    completed: "bg-emerald-100 text-emerald-800",
    resolved: "bg-emerald-100 text-emerald-800",
    pending: "bg-slate-100 text-slate-800",
};

function getStatusClass(status) {
    if (!status) return "bg-slate-100 text-slate-800";
    return statusStyles[status.toString().toLowerCase()] || "bg-slate-100 text-slate-800";
}

export default function ProjectShowPage({ project }) {
    if (!project) return <p className="text-center py-16 text-slate-500">Loading project...</p>;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-600">Project details</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{project.name}</h1>
                    {project.summary && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{project.summary}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <a
                        href={`/projects/${project.id}/edit`}
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                    >
                        Edit Project
                    </a>
                    <a
                        href="/projects"
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        Back to projects
                    </a>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
                <section className="space-y-6">
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Status</p>
                                <div className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(project.status)}`}>
                                    {project.status ? project.status.replace(/_/g, " ") : "Unknown"}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:auto-cols-min lg:grid-flow-col">
                                {project.due_date && (
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Due date</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{project.due_date}</p>
                                    </div>
                                )}
                                {project.start_date && (
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Start date</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{project.start_date}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        {project.image_url ? (
                            <img
                                src={project.image_url}
                                alt={project.name}
                                className="h-[320px] w-full rounded-3xl object-cover object-center"
                            />
                        ) : (
                            <div className="flex h-[320px] items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                                No image available
                            </div>
                        )}

                        <div className="mt-6 space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">Project overview</h2>
                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    {project.description || "No project description available."}
                                </p>
                            </div>

                            {project.progress_percentage != null && (
                                <div>
                                    <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                                        <span>Progress</span>
                                        <span>{project.progress_percentage}%</span>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-sky-600"
                                            style={{ width: `${project.progress_percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="grid gap-4 sm:grid-cols-2">
                                {project.priority && (
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Priority</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{project.priority}</p>
                                    </div>
                                )}
                                {project.client_name && (
                                    <div className="rounded-3xl bg-slate-50 p-4">
                                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Client</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{project.client_name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="space-y-6">
                    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Team</p>
                                <h2 className="mt-2 text-xl font-semibold text-slate-900">{project.team_name || "Project team"}</h2>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            {project.developer_users?.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">Developers</h3>
                                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                        {project.developer_users.map((user) => (
                                            <li key={user.id} className="rounded-2xl bg-slate-50 px-4 py-3">
                                                {user.name}
                                                {user.role && <span className="ml-2 text-xs uppercase tracking-[0.18em] text-slate-400">{user.role}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.qa_users?.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">QA</h3>
                                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                        {project.qa_users.map((user) => (
                                            <li key={user.id} className="rounded-2xl bg-slate-50 px-4 py-3">
                                                {user.name}
                                                {user.role && <span className="ml-2 text-xs uppercase tracking-[0.18em] text-slate-400">{user.role}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.team_lead && (
                                <div className="rounded-3xl bg-slate-50 p-4">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Team lead</p>
                                    <p className="mt-2 text-sm font-semibold text-slate-900">{project.team_lead}</p>
                                </div>
                            )}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    );
}
