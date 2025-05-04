import { Link, useLocation } from "react-router-dom";
import { useExercises } from "../context/ExerciseContext";
import { useEffect, useState } from "react";
import { User } from "../types";
import authService from "../services/authService";

export default function Navbar() {
  const location = useLocation();
  const { exercises, exerciseInfos, searchQuery, setSearchQuery } =
    useExercises();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();

    setUser(user);
  }, []);

  const isInfoPage =
    location.pathname.startsWith("/exercisesinfo") ||
    location.pathname.startsWith("/exerciseinfo");

  const count = isInfoPage
    ? exerciseInfos.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).length
    : exercises.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).length;

  return (
    <div className="bg-base-200 shadow-sm px-4 py-2">
      <div className="flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full sm:w-64 md:w-72"
          />
          {user && (
            <span className="text-sm font-semibold text-gray-700">
              {user.name}
            </span>
          )}
          <Link
            to="/exercisesinfo"
            className="relative inline-block text-md font-semibold"
          >
            EXERCISES-INFO
          </Link>
          {user && (
            <Link to="/logout" className="text-sm font-semibold text-secondary">
              Logout
            </Link>
          )}
          <p className="text-sm text-secondary text-center md:text-right">
            Showing {count} exercises in the database
          </p>
        </div>
      </div>
    </div>
  );
}
