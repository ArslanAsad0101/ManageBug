import React from "react";

export default function ProjectCard({ project }) {
    return (
        <a
            href={`/projects/${project.id}`}
            className="group block overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="h-52 w-full overflow-hidden bg-slate-100">
                {project.image_url ? (
                    <img
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        src={project.image_url}
                        alt={project.name}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-slate-100 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                        No image
                    </div>
                )}
            </div>

            <div className="space-y-3 p-6">
                <h2 className="text-xl font-semibold text-slate-900">{project.name}</h2>
                <p className="min-h-[3.5rem] text-sm leading-6 text-slate-600">{project.description}</p>
            </div>
        </a>
    );
}
