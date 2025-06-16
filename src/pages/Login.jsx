// pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
 // Important for decoding Google user info

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
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      alert("Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google User:", decoded); // optional

    const res = await axios.post("http://localhost:3000/api/google-login", {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });

    if (res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Google Login successful!");
      window.dispatchEvent(new Event("login-status-changed"));
      navigate("/");
    }
  };

  const handleGoogleError = () => {
    alert("Google Login Failed");
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

      <div className="mt-6">
        <p className="text-center text-gray-600 mb-2">or login with</p>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
      </div>
    </div>
  );
};

export default Login;
