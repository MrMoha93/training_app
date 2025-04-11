import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/exercises");
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-10">Training App</h1>
      <Outlet />
    </div>
  );
}
