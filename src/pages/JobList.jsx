import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const applyBtnStyle = {
    margin: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }



  const query = useQuery();
  const search = query.get("search")?.toLowerCase() || "";
  const type = query.get("type") || "";

  useEffect(() => {
    axios.get("http://localhost:3000/api/jobs")
      .then(res => {
        const filtered = res.data.filter(job => {
          const matchesSearch =
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search) ||
            job.location.toLowerCase().includes(search);
          const matchesType = type ? job.type === type : true;
          return matchesSearch && matchesType;
        });
        setJobs(filtered);
      })
      .catch(err => console.error("Failed to fetch jobs", err));
  }, [search, type]);


  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => setSelectedJob(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>📋 All Job Listings</h2>
      {jobs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No jobs posted yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {jobs.map(job => (
            <div key={job.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "10px" }}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Skills:</strong> {job.skills}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Contact:</strong> {job.contact}</p>
              <small>🕒 Posted on: {new Date(job.created_at).toLocaleString()}</small>
              <Link to={`/apply/${job.id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                  Apply Now
                </button>
              </Link>

            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedJob && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", padding: "2rem", borderRadius: "10px", minWidth: "300px" }}>
            <h3>Apply to {selectedJob.title}</h3>
            <p><strong>Contact Email:</strong> {selectedJob.contact}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <button onClick={closeModal} style={{ marginTop: "1rem" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default JobList;
