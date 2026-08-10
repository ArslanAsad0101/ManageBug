import React, { useEffect, useState } from "react";

export default function ImageUpload({ onFileSelect, initialUrl }) {
    const [previewUrl, setPreviewUrl] = useState(initialUrl);

    useEffect(() => {
        setPreviewUrl(initialUrl);
    }, [initialUrl]);

    function handleFileChange(event) {
        const file = event.target.files[0];
        onFileSelect(file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    return (
        <div className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <label className="block text-sm font-semibold text-slate-900">Project Image</label>
            <label className="group relative flex h-56 w-full cursor-pointer items-center justify-center overflow-hidden rounded-[28px] border border-dashed border-slate-300 bg-white text-center transition hover:border-slate-400">
                {previewUrl ? (
                    <img className="h-full w-full object-cover" src={previewUrl} alt="Project preview" />
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 px-4 text-slate-500">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-2xl font-bold text-sky-600">
                            +
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Upload logo</p>
                            <p className="text-sm text-slate-500">PNG, JPG or GIF</p>
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                />
            </label>
            <p className="text-sm text-slate-500">Recommended size: 300x300px. Leave empty to skip upload.</p>
        </div>
    );
}
