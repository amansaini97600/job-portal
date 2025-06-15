import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import JobList from "../pages/JobList";
import PostJob from "../pages/PostJob";
import Layout from "../components/Layout";
import ApplyJob from "../pages/ApplyJob";
import AdminDashboard from "../admin/AdminDashboard";
import JobManager from "../admin/JobManager";
import Applications from "../admin/Applications";
import AdminLogin from "../admin/AdminLogin";
import AdminProtectedRoute from "../admin/AdminProtectedRoute";
import AdminLayout from "../admin/AdminLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
  <Routes>

    {/* Public Layout Routes */}
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="jobs" element={<JobList />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="register" element={<Register/>} />
      <Route path="post-job" element={<PostJob />} />
      <Route path="apply/:id" element={<ApplyJob />} />
    </Route>

    {/* Admin Login - OUTSIDE Layout */}
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* Admin Layout Protected */}
    <Route
      path="/admin"
      element={
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="jobs" element={<JobManager />} />
      <Route path="applications" element={<Applications />} />
    </Route>

  </Routes>
</BrowserRouter>

  );
};

export default AppRoutes;
