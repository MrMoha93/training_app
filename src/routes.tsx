import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ExercisePage from "./pages/ExercisePage";
import ExercisesPage from "./pages/ExercisesPage";
import ExercisesinfoPage from "./pages/ExercisesInfoPage";
import ExerciseInfoPage from "./pages/ExerciseInfoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout";

const router = createBrowserRouter([
  { path: "/", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/logout", element: <Logout /> },

  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "exercises", element: <ExercisesPage /> },
          { path: "exercises/:id", element: <ExercisePage /> },
          { path: "exercisesinfo", element: <ExercisesinfoPage /> },
          { path: "exerciseinfo/:id", element: <ExerciseInfoPage /> },
        ],
      },
    ],
  },
]);

export default router;
