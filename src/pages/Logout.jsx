import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    alert("Logged out!");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout 