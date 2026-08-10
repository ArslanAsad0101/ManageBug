import React, { useEffect, useState } from "react";
import MultiSelect from "../shared/MultiSelect";
import ImageUpload from "../shared/ImageUpload";
import { getCsrfToken } from "../../lib/csrf";

export default function ProjectForm({ mode, projectId }) {
    const isEdit = mode === "edit";
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [qas, setQas] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [selectedQaIds, setSelectedQaIds] = useState([]);
    const [selectedDevIds, setSelectedDevIds] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const url = isEdit ? `/projects/${projectId}/edit.json` : "/projects/new.json";

        fetch(url, { headers: { Accept: "application/json" } })
            .then((res) => res.json())
            .then((data) => {
                setQas(data.qas || []);
                setDevelopers(data.developers || []);

                if (isEdit) {
                    setName(data.project.name || "");
                    setDescription(data.project.description || "");
                    setImageUrl(data.project.image_url || null);

                    const selectedIds = new Set(data.selected_user_ids || []);
                    setSelectedQaIds((data.qas || []).filter((q) => selectedIds.has(q.id)).map((q) => q.id));
                    setSelectedDevIds((data.developers || []).filter((d) => selectedIds.has(d.id)).map((d) => d.id));
                }
            });
    }, [isEdit, projectId]);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);

        const formData = new FormData();
        formData.append("project[name]", name);
        formData.append("project[description]", description);
        if (imageFile) formData.append("project[image]", imageFile);

        selectedQaIds.forEach((id) => formData.append("project[qa_user_ids][]", id));
        selectedDevIds.forEach((id) => formData.append("project[developer_user_ids][]", id));

        const url = mode === "edit" ? `/projects/${projectId}` : "/projects";
        const method = mode === "edit" ? "PATCH" : "POST";

        const res = await fetch(url, {
            method,
            headers: { Accept: "application/json", "X-CSRF-Token": getCsrfToken() },
            body: formData,
        });

        if (res.ok) {
            const saved = await res.json();
            window.location.href = `/projects/${saved.id}`;
        } else {
            const data = await res.json();
            setErrors(data.errors || ["Something went wrong."]);
        }
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="sm:flex sm:items-end sm:justify-between sm:gap-6">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900">{mode === "edit" ? "Edit Project" : "Create Project"}</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                            Add project details, assign team members, and upload an image for a polished project overview.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                    {errors.length > 0 && (
                        <div className="mb-6 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                            <ul className="list-disc space-y-2 pl-5">
                                {errors.map((error) => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid gap-8 xl:grid-cols-[1.6fr,1fr]">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Name</label>
                                <input
                                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900">Description</label>
                                <textarea
                                    className="mt-3 h-40 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <MultiSelect label="QA" users={qas} selectedIds={selectedQaIds} onChange={setSelectedQaIds} />
                            <MultiSelect label="Developers" users={developers} selectedIds={selectedDevIds} onChange={setSelectedDevIds} />
                        </div>

                        <aside>
                            <ImageUpload onFileSelect={setImageFile} initialUrl={imageUrl} />
                        </aside>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-end gap-3">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                        >
                            {mode === "edit" ? "Update Project" : "Create Project"}
                        </button>
                        <a
                            href="/projects"
                            className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}
