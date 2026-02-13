"use client"

import { useRouter } from "next/navigation";

export default function CallToAction() {
    const router = useRouter();

    return (
        <section className="py-20 bg-linear-to-br from-emerald-50 via-white to-teal-50">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                        Ready to Find Your Perfect Venue?
                    </h2>
                    <p className="mb-10 text-lg text-gray-600">
                        Join thousands of satisfied customers who found their dream venue through BookVenu
                    </p>

                    <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                        <button
                            onClick={() => router.push("/lawns")}
                            className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg font-semibold text-white hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                        >
                            Explore Venues
                        </button>
                        <button
                            onClick={() => router.push("/register")}
                            className="rounded-lg border-2 border-emerald-600 bg-white px-8 py-4 text-lg font-semibold text-emerald-600 hover:bg-emerald-50 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                        >
                            List Your Venue
                        </button>
                    </div>

                    <p className="mt-8 text-gray-500">
                        Venue owners: Reach thousands of customers.{" "}
                        <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-700">
                            Learn more →
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}