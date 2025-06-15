import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyJob = () => {
    const { id } = useParams(); // ✅ Job ID from URL
    const [form, setForm] = useState({ name: '', email: '', resume: '' });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume") {
            setForm({ ...form, resume: files[0] }); // store file
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("jobId", id);
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("resume", form.resume);

        try {
            await axios.post("http://localhost:3000/api/apply", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Application sent successfully!");
        } catch (error) {
            console.error("❌ Application Error:", error.response?.data || error.message);
            alert("Failed to apply");
        }
    };


    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Apply for Job ID: {id}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type='file' name="resume" placeholder="Write about yourself / paste resume" rows={5} onChange={handleChange} required className="w-full p-2 border rounded" />

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default ApplyJob;
