import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ExercisePage from "./pages/ExercisePage";

const router = createBrowserRouter([
  { path: "/exercises", element: <App /> },
  { path: "/exercises/:id", element: <ExercisePage /> },
]);

export default router;
