import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobManager = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/jobs').then(res => setJobs(res.data));
  }, []);

  const deleteJob = async (id) => {
    if (window.confirm("Delete this job?")) {
      await axios.delete(`http://localhost:3000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Job Listings</h2>
      {jobs.map(job => (
        <div key={job.id} className="border p-3 rounded mb-3">
          <h3>{job.title} at {job.company}</h3>
          <button onClick={() => deleteJob(job.id)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JobManager;
