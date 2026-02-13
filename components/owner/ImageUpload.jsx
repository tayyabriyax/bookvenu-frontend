// components/owner/ImageUpload.js (Updated for edit mode)
"use client";

import { useRef, useState } from "react";

export default function ImageUpload({ images, onUpload, onRemove, isEditMode = false }) {
    const fileInputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            onUpload(files.slice(0, 10)); // Limit to 10 files
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            onUpload(files.slice(0, 10)); // Limit to 10 files
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Separate existing and new images
    const existingImages = images.filter(img => img.isExisting);
    const newImages = images.filter(img => !img.isExisting);

    return (
        <div>
            {/* Drag & Drop Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${dragActive
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <span className="text-2xl">📷</span>
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG, WebP up to 5MB each</p>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        Browse Files
                    </button>
                </div>
            </div>

            {/* Existing Images (Edit Mode Only) */}
            {isEditMode && existingImages.length > 0 && (
                <div className="mt-6">
                    <h4 className="mb-3 text-sm font-medium text-gray-700">Existing Images</h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {existingImages.map((image) => (
                            <div key={image.id} className="group relative">
                                <div className="aspect-square overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
                                    <div className="flex h-full items-center justify-center">
                                        <span className="text-3xl text-gray-600">{image.preview}</span>
                                    </div>
                                    <div className="absolute left-2 top-2 rounded bg-gray-600 px-2 py-1 text-xs font-medium text-white">
                                        Existing
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                    {image.name}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemove(image.id)}
                                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    title="Remove image"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Click the X button to mark existing images for removal
                    </div>
                </div>
            )}

            {/* New Images */}
            {newImages.length > 0 && (
                <div className="mt-6">
                    <h4 className="mb-3 text-sm font-medium text-gray-700">
                        {isEditMode ? "New Images to Add" : "Uploaded Images"}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {newImages.map((image, index) => (
                            <div key={image.id} className="group relative">
                                <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                    <div className="flex h-full items-center justify-center">
                                        <span className="text-3xl text-gray-400">🏢</span>
                                    </div>
                                    {index === 0 && (
                                        <div className="absolute left-2 top-2 rounded bg-emerald-600 px-2 py-1 text-xs font-medium text-white">
                                            Cover
                                        </div>
                                    )}
                                    <div className="absolute left-2 top-10 rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                                        New
                                    </div>
                                </div>
                                <div className="mt-2 truncate text-xs text-gray-500">
                                    {image.name}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onRemove(image.id)}
                                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}