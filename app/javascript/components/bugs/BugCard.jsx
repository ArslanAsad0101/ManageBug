import React from "react";

const statusStyles = {
    pending: "bg-slate-100 text-slate-800",
    started: "bg-sky-100 text-sky-800",
    completed: "bg-emerald-100 text-emerald-800",
};

function getStatusClass(status) {
    if (!status) return "bg-slate-100 text-slate-800";
    return statusStyles[status] || "bg-slate-100 text-slate-800";
}

export default function BugCard({ bug }) {
    return (
        <a
            href={`/projects/${bug.project_id}/bugs/${bug.id}`}
            className="block overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">{bug.title}</h2>
                <span className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(bug.status)}`}>
                    {bug.status_label}
                </span>
            </div>

            <div className="mt-4 space-y-1 text-sm text-slate-600">
                <p><span className="font-medium text-slate-500">Project:</span> {bug.project_name}</p>
                <p><span className="font-medium text-slate-500">Assigned:</span> {bug.developer?.name || "Unassigned"}</p>
                {bug.deadline && <p><span className="font-medium text-slate-500">Due:</span> {bug.deadline}</p>}
            </div>
        </a>
    );
}