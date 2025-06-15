// pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", form);
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful!");
        navigate("/"); // or navigate to dashboard
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      alert("Login failed");
    }
  };



  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
