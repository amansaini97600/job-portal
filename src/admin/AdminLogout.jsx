import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove admin session/token
    localStorage.removeItem("isAdmin");
    
    // Redirect to login
    navigate("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full text-left"
    >
      Logout
    </button>
  );
};

export default AdminLogout;
