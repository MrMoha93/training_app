import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ExercisePage from "./pages/ExercisePage";
import ExercisesPage from "./pages/ExercisesPage";
import ExercisesinfoPage from "./pages/ExercisesInfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ExercisesPage /> },
      { path: "exercises", element: <ExercisesPage /> },
      { path: "exercises/:id", element: <ExercisePage /> },
      { path: "exercisesinfo", element: <ExercisesinfoPage /> },
    ],
  },
]);

export default router;
