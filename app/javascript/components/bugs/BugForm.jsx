import React, { useEffect, useState } from "react";
import ImageUpload from "../shared/ImageUpload";
import { getCsrfToken } from "../../lib/csrf";

const BUG_TYPES = [
    { value: "feature", label: "Feature" },
    { value: "bug", label: "Bug" },
];

function statusOptionsFor(bugType) {
    return [
        { value: "pending", label: "Pending" },
        { value: "started", label: "Started" },
        { value: "completed", label: bugType === "bug" ? "Resolved" : "Completed" },
    ];
}

export default function BugForm({ mode, projectId, bugId }) {
    const isEdit = mode === "edit";
    const [step, setStep] = useState(1);
    const [projects, setProjects] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [isDeveloper, setIsDeveloper] = useState(false);

    const [selectedProjectId, setSelectedProjectId] = useState(projectId || "");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [bugType, setBugType] = useState("bug");
    const [status, setStatus] = useState("pending");
    const [developerId, setDeveloperId] = useState("");
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [screenshotUrl, setScreenshotUrl] = useState(null);

    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUrl = isEdit ? `/projects/${projectId}/bugs/${bugId}/edit.json` : "/bugs/new.json";

        fetch(loadUrl, { headers: { Accept: "application/json" } })
            .then((res) => res.json())
            .then((data) => {
                if (isEdit) {
                    setDevelopers(data.developers || []);
                    setIsDeveloper(data.is_developer);

                    const bug = data.bug;
                    setSelectedProjectId(bug.project_id);
                    setTitle(bug.title || "");
                    setDescription(bug.description || "");
                    setDeadline(bug.deadline || "");
                    setBugType(bug.bug_type || "bug");
                    setStatus(bug.status || "pending");
                    setDeveloperId(bug.developer?.id || "");
                    setScreenshotUrl(bug.screenshot_url || null);
                } else {
                    setProjects(data.projects || []);
                    if (projectId) {
                        setSelectedProjectId(projectId);
                        setDevelopers(data.developers || []);
                    }
                }
            })
            .finally(() => setLoading(false));
    }, [isEdit, projectId, bugId]);

    function validateStepOne() {
        const stepErrors = [];
        if (!selectedProjectId) stepErrors.push("Project must be selected");
        if (!title.trim()) stepErrors.push("Title can't be blank");
        if (!deadline) stepErrors.push("Deadline can't be blank");
        return stepErrors;
    }

    async function handleNext(e) {
        e.preventDefault();
        const stepErrors = validateStepOne();
        if (stepErrors.length > 0) {
            setErrors(stepErrors);
            return;
        }
        setErrors([]);

        const res = await fetch(`/bugs/new.json?project_id=${selectedProjectId}`, { headers: { Accept: "application/json" } });
        const data = await res.json();
        setDevelopers(data.developers || []);
        setStep(2);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const formData = new FormData();
        const sendFullPayload = !isEdit || !isDeveloper;
        if (sendFullPayload) {
            formData.append("bug[project_id]", selectedProjectId);
            formData.append("bug[title]", title);
            formData.append("bug[description]", description);
            formData.append("bug[deadline]", deadline);
            formData.append("bug[bug_type]", bugType);
            formData.append("bug[developer_id]", developerId);
            if (screenshotFile) formData.append("bug[screenshot]", screenshotFile);
        }
        formData.append("bug[status]", status);

        const url = isEdit ? `/projects/${projectId}/bugs/${bugId}` : "/bugs";
        const method = isEdit ? "PATCH" : "POST";

        const res = await fetch(url, {
            method,
            headers: { Accept: "application/json", "X-CSRF-Token": getCsrfToken() },
            body: formData,
        });

        if (res.ok) {
            const saved = await res.json();
            window.location.href = `/projects/${saved.project_id}/bugs/${saved.id}`;
        } else {
            const data = await res.json();
            setErrors(data.errors || ["Something went wrong."]);
        }
    }

    if (loading) return <p className="text-center py-16 text-slate-500">Loading...</p>;

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-semibold text-slate-900">{mode === "edit" ? "Edit Bug" : "Create New Bug"}</h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    {mode === "edit" ? "Update bug details or its status." : `Step ${step} of 2: ${step === 1 ? "Bug details" : "Select a developer"}`}
                </p>
            </div>

            {errors.length > 0 && (
                <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                    <ul className="list-disc space-y-2 pl-5">
                        {errors.map((error) => <li key={error}>{error}</li>)}
                    </ul>
                </div>
            )}

            {mode === "new" && projects.length === 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
                    You do not have any assigned projects yet. Please ask your manager to assign a project before creating a bug.
                </div>
            )}

            {mode === "new" && projects.length > 0 && step === 1 && (
                <form onSubmit={handleNext} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900">Project</label>
                        <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
                            <option value="">Select a project</option>
                            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-900">Title</label>
                        <input className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-900">Description</label>
                        <textarea className="mt-3 h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-semibold text-slate-900">Deadline</label>
                            <input type="date" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-900">Bug Type</label>
                            <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={bugType} onChange={(e) => setBugType(e.target.value)}>
                                {BUG_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700">Next</button>
                    </div>
                </form>
            )}

            {mode === "new" && step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    <div>
                        <label className="block text-sm font-semibold text-slate-900">Developer</label>
                        <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={developerId} onChange={(e) => setDeveloperId(e.target.value)}>
                            <option value="">Select developer</option>
                            {developers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-900">Screenshot</label>
                        <div className="mt-3">
                            <ImageUpload onFileSelect={setScreenshotFile} initialUrl={screenshotUrl} />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" onClick={() => setStep(1)} className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Back</button>
                        <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700">Create Bug</button>
                    </div>
                </form>
            )}

            {mode === "edit" && (
                <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    {isDeveloper ? (
                        <>
                            <div className="space-y-2 text-sm text-slate-700">
                                <p><strong>Title:</strong> {title}</p>
                                <p><strong>Description:</strong> {description}</p>
                                <p><strong>Deadline:</strong> {deadline || "—"}</p>
                                <p><strong>Bug Type:</strong> {bugType}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Update Status</label>
                                <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    {statusOptionsFor(bugType).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Title</label>
                                <input className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Description</label>
                                <textarea className="mt-3 h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900">Deadline</label>
                                    <input type="date" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900">Bug Type</label>
                                    <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={bugType} onChange={(e) => setBugType(e.target.value)}>
                                        {BUG_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Status</label>
                                <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    {statusOptionsFor(bugType).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Assign Developer</label>
                                <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" value={developerId} onChange={(e) => setDeveloperId(e.target.value)}>
                                    <option value="">Select developer</option>
                                    {developers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Screenshot</label>
                                <div className="mt-3">
                                    <ImageUpload onFileSelect={setScreenshotFile} initialUrl={screenshotUrl} />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-3">
                        <button type="submit" className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700">
                            {isDeveloper ? "Update Status" : "Update Bug"}
                        </button>
                        <a href={`/projects/${projectId}/bugs/${bugId}`} className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                            Cancel
                        </a>
                    </div>
                </form>
            )}
        </div>
    );
}