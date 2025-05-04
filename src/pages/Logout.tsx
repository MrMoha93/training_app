import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.logout();
    navigate("/login");
  }, []);

  return <></>;
}

export default Logout;
