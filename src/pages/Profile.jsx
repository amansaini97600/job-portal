import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser) return;

    // Optionally fetch fresh data from backend
    axios.get(`http://localhost:3000/api/user/${localUser._id}`)
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        console.error("❌ Error fetching user data", err);
        setUser(localUser); // fallback
      });
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more details if available */}
    </div>
  );
};

export default Profile;
