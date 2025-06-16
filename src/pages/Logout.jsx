import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔴 1. Clear user data
    localStorage.removeItem("user");

    // 🔁 2. Dispatch custom event to notify Layout.jsx
    window.dispatchEvent(new Event("login-status-changed"));

    // ✅ 3. Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // Optional: you can show "Logging out..." message if you want
};

export default Logout;
