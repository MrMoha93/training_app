import { Outlet } from "react-router-dom";
import ExerciseProvider from "./context/ExerciseContext";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <ExerciseProvider>
      <Navbar />
      <Outlet />
    </ExerciseProvider>
  );
}
