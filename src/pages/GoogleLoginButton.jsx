import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
   const decoded = jwtDecode(credentialResponse.credential);
    console.log("✅ Google User:", decoded);

    // Optional: send to backend to save/create user
    const res = await axios.post("http://localhost:3000/api/google-login", {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    });

    localStorage.setItem("user", JSON.stringify(res.data.user));
    alert("Logged in with Google!");
    window.location.href = "/"; // navigate to homepage
  };

  const handleError = () => {
    alert("Google Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
