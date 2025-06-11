import React from "react";
import { Briefcase, MapPin } from "lucide-react";

const Home = () => {
  const jobs = [
    {
      id: 1,
      title: "Tally Operator",
      company: "Singh Traders",
      location: "Dhampur, Bijnor",
    },
    {
      id: 2,
      title: "Excel Data Entry",
      company: "Gupta Electronics",
      location: "Dhampur, Bijnor",
    },
    {
      id: 3,
      title: "Computer Teacher",
      company: "Bright Coaching Centre",
      location: "Dhampur, Bijnor",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Menu */}
      <aside className="w-1/4 bg-blue-900 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li className="hover:text-yellow-400 cursor-pointer">Home</li>
          <li className="hover:text-yellow-400 cursor-pointer">All Jobs</li>
          <li className="hover:text-yellow-400 cursor-pointer">Post Job</li>
          <li className="hover:text-yellow-400 cursor-pointer">Login</li>
          <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Jobs in Dhampur</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all">
              <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
                <Briefcase className="mr-2 text-blue-600" /> {job.title}
              </h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="flex items-center text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" /> {job.location}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;