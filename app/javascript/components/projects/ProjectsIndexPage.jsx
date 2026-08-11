import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsIndexPage({ initialSearch, canCreate }) {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState(initialSearch || "");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `/projects.json${search ? `?search=${encodeURIComponent(search)}` : ""}`;

        fetch(url, { headers: { Accept: "application/json" } })
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .finally(() => setLoading(false));
    }, [search]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-6 border border-slate-200 border-l-4 border-l-green-500 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">Projects</p>
                    <h1 className="mt-1 text-xl font-semibold text-slate-900 sm:text-4xl">Visnext Software Solution</h1>
                    <p className="mt-1 max-w-lg text-sm leading-6 text-slate-600">
                        Hi DeVisnext, Welcome to ManageBug
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <input
                        className="w-full min-w-[220px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200 sm:w-[320px]"
                        placeholder="Search for Projects here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {canCreate && (
                        <a
                            href="/projects/new"
                            className="inline-flex items-center justify-center bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                        >
                            + Add New Project
                        </a>
                    )}
                </div>
            </div>

            {loading ? (
                <p className="text-sm text-slate-600">Loading...</p>
            ) : projects.length === 0 ? (
                <p className="text-sm text-slate-600">No projects found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
