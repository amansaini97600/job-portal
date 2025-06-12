import React, { useState } from "react";
import axios from "axios";
// import "./PostJob.css"; // Optional: apna style yahan se apply kar sakte ho

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "",
    skills: "",
    salary: "",
    contact: "",
    location: "Dhampur",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/jobs", form);
      alert("🎉 Job posted successfully!");
      setForm({
        title: "",
        company: "",
        type: "",
        skills: "",
        salary: "",
        contact: "",
        location: "Dhampur",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error posting job.");
    }
  };

  return (
    <div className="post-job-page" style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>📝 Post a Job</h2>
      <form onSubmit={handleSubmit} className="post-job-form" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required />
        {/* <input type="text" name="type" placeholder="Job Type (e.g. Full-time, Part-time)" value={form.type} onChange={handleChange} required /> */}

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Job Type</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Internship">Internship</option>
        </select>


        <input type="text" name="skills" placeholder="Skills Required" value={form.skills} onChange={handleChange} required />
        <input type="text" name="salary" placeholder="Salary (optional)" value={form.salary} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Information" value={form.contact} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />

        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#2563eb", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>
          🚀 Submit Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
