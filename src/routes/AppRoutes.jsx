import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import Login from "../pages/Login";y
// import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard";
import JobList from "../pages/JobList";
// import JobDetail from "../pages/JobDetail";
import PostJob from "../pages/PostJob";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/post-job" element={<PostJob />} /> 
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job/:id" element={<JobDetail />} />
        */
      }
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
