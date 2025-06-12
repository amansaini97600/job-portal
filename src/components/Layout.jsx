// src/components/Layout.jsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const isLoggedIn = false; // replace with real auth later

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center bg-blue-900 text-white p-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="md:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Dhampur Job Portal</h1>
                </div>

                {/* Search + Filter */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const query = e.target.search.value;
                        const type = e.target.type.value;
                        window.location.href = `/jobs?search=${query}&type=${type}`;
                    }}
                    className="hidden md:flex space-x-2 items-center"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search jobs..."
                        className="px-2 py-1 rounded-2xl text-white border-white border-2"
                    />
                    <select
                        name="type"
                        className="px-2 py-1 rounded text-white bg-blue-900"
                        defaultValue=""
                    >
                        <option value="">All Types</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <button className="bg-white text-blue-900 px-3 py-1 rounded">Search</button>
                </form>


                <div>
                    {isLoggedIn ? (
                        <button className="bg-white text-blue-900 px-3 py-1 rounded">Profile</button>
                    ) : (
                        <Link to="/login" className="bg-white text-blue-900 px-3 py-1 rounded">Login</Link>
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className={`bg-blue-900 text-white w-64 p-5 space-y-4 transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static fixed z-10 h-full`}>
                    <h2 className="text-xl font-bold mb-4">Menu</h2>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-yellow-400 active:text-amber-900">Home</Link></li>
                        <li><Link to="/jobs" className="hover:text-yellow-400">All Jobs</Link></li>
                        <li><Link to="/post-job" className="hover:text-yellow-400">Post Job</Link></li>
                        <li><Link to="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
                    </ul>
                </aside>

                {/* Page Content */}
                <main className="flex-1 p-6 bg-gray-50 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
