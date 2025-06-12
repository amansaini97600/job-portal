import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyJob = () => {
    const { id } = useParams(); // Job ID
    const [form, setForm] = useState({ name: '', email: '', resume: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/apply", {
                jobId: jobIdFromURL,
                name: form.name,
                email: form.email,
                resume: form.resume,
            });
            alert("Application sent successfully!");
        } catch (error) {
            console.error("❌ Application Error:", error);
            alert("Failed to apply");
        }
    };


    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Apply for Job ID: {id}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
                <textarea name="resume" placeholder="Write about yourself / paste resume" rows={5} onChange={handleChange} required className="w-full p-2 border rounded" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Apply Now</button>
            </form>
        </div>
    );
};

export default ApplyJob;
