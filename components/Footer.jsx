// components/Footer.js
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <div className="mb-4 flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-emerald-500 to-teal-600"></div>
                            <span className="text-2xl font-bold">BookVenu</span>
                        </div>
                        <p className="text-gray-400">
                            India&apos;s leading platform for venue bookings. Making celebrations memorable since 2023.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Browse Venues</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Popular Cities</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Venue Categories</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* For Partners */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">For Partners</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">List Your Venue</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Partner Dashboard</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>📧 support@bookvenu.com</li>
                            <li>📞 +91 98765 43210</li>
                            <li>📍 Mumbai, India</li>
                        </ul>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition-colors">📱</a>
                            <a href="#" className="rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition-colors">🐦</a>
                            <a href="#" className="rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition-colors">📘</a>
                            <a href="#" className="rounded-full bg-gray-800 p2 hover:bg-gray-700 transition-colors">💼</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>© 2023 BookVenu. All rights reserved. | Privacy Policy | Terms of Service</p>
                </div>
            </div>
        </footer>
    );
}