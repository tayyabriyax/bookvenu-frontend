// components/ImageGallery.js
"use client";

import { useState } from "react";

export default function ImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl text-white/30">🏢</span>
                </div>

                {/* Image Counter */}
                <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur-sm">
                    {selectedImage + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden rounded-lg transition-all ${selectedImage === index
                                ? "ring-2 ring-emerald-500 ring-offset-2"
                                : "opacity-70 hover:opacity-100"
                            }`}
                    >
                        <div className="h-full w-full bg-linear-to-br from-emerald-300 to-teal-400" />
                    </button>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                    className="rounded-full bg-white p-3 shadow-lg hover:bg-gray-50"
                >
                    ←
                </button>
                <button
                    onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                    className="rounded-full bg-white p-3 shadow-lg hover:bg-gray-50"
                >
                    →
                </button>
            </div>
        </div>
    );
}