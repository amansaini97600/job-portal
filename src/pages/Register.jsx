import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/register", form);
      if (res.data.success) {
        alert("Registration successful");
        window.dispatchEvent(new Event("login-status-changed"));
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("❌ Registration Error:", error);
      alert("Server error");
    }
  };

  // ✅ Google success handler
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("✅ Google user data:", decoded);

      // You can send this data to your backend for registration/login
      // Example: axios.post("/api/google-auth", decoded)

      alert(`Welcome, ${decoded.name}`);
      navigate("/"); // or navigate to dashboard
    } catch (err) {
      console.error("❌ Decode error:", err);
      alert("Failed to decode Google token");
    }
  };

  // ❌ Google error handler
  const handleGoogleFailure = () => {
    console.error("❌ Google Login Failed");
    alert("Google login failed");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h2 className="text-2xl font-bold mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>

      <p className="text-center text-gray-500">or register with google</p>


            {/* Google Login */}
      <div className="mb-6">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
        />
      </div>
    </div>
  );
};

export default Register;
