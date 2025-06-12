import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import Login from "../pages/Login";y
// import Register from "../pages/Register";
// import Dashboard from "../pages/Dashboard";
import JobList from "../pages/JobList";
// import JobDetail from "../pages/JobDetail";
import PostJob from "../pages/PostJob";
// import Header from "../components/Header";
import Layout from '../components/Layout'
import ApplyJob from "../pages/ApplyJob";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="/apply/:id" element={<ApplyJob />} />

          {/* Add other pages */}
        </Route>
        
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
