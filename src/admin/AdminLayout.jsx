import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminLogout from './AdminLogout';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-4">
            <Link to="/admin/dashboard" className="block hover:text-yellow-400">Dashboard</Link>
            <Link to="/admin/jobs" className="block hover:text-yellow-400">Manage Jobs</Link>
            <Link to="/admin/applications" className="block hover:text-yellow-400">View Applications</Link>
            <Link to="/" className="block text-sm mt-6 text-gray-300 hover:text-white">← Back to Home</Link>
          </nav>
        </div>
        <AdminLogout />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
