import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ExercisePage from "./pages/ExercisePage";
import ExercisesPage from "./pages/ExercisesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ExercisesPage /> },
      { path: "exercises", element: <ExercisesPage /> },
      { path: "exercises/:id", element: <ExercisePage /> },
    ],
  },
]);

export default router;
