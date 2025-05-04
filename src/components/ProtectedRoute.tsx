import auth from "../services/authService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const user = auth.getCurrentUser();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={location.pathname} />;

  return <Outlet />;
}
