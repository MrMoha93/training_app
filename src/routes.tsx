import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ExercisePage from "./pages/ExercisePage";
import ExercisesPage from "./pages/ExercisesPage";
import TrainingSessionPage from "./pages/TrainingSessionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "sessions", element: <TrainingSessionPage /> },
      { path: "exercises", element: <ExercisesPage /> },
      { path: "exercises/:id", element: <ExercisePage /> },
    ],
  },
]);

export default router;
