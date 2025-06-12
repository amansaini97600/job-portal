import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs for home:", err));
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="w-3/4 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Jobs in Dhampur</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.length === 0 ? (
            <p className="text-center col-span-2 text-gray-500">No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
                  <Briefcase className="mr-2 text-blue-600" /> {job.title}
                </h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="flex items-center text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" /> {job.location}
                </p>
                <Link to={`/apply/${job.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                    Apply Now
                  </button>
                </Link>

              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
