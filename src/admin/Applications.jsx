import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/applications')
      .then(res => setApplications(res.data))
      .catch(err => console.error("Error fetching applications", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📄 Job Applications</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Job Title</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Resume</th>
            <th className="p-2 border">Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, i) => (
            <tr key={app.id} className="bg-white even:bg-gray-100">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{app.job_title}</td>
              <td className="p-2 border">{app.name}</td>
              <td className="p-2 border">{app.email}</td>
              <th className="p-2 border">
                <a
                  href={`http://localhost:3000${app.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-1 bg-blue-600 text-white font-medium rounded shadow hover:bg-blue-700 transition-all duration-200 "
                >
                  View Resume
                </a>
              </th>
              <td className="text-sm text-gray-700 p-2 border">
                {new Date(app.created_at).toLocaleString()}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
