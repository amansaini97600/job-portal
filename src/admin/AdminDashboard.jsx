import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛠️ Admin Dashboard</h1>
      <ul className="space-y-3">
        <li><Link to="/admin/jobs" className="text-blue-700 underline">Manage Jobs</Link></li>
        <li><Link to="/admin/applications" className="text-blue-700 underline">View Applications</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
