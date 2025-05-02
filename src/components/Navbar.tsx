import { Link, useLocation } from "react-router-dom";
import { useExercises } from "../context/ExerciseContext";

export default function Navbar() {
  const location = useLocation();
  const { exercises, exerciseInfos, searchQuery, setSearchQuery } =
    useExercises();

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
    <div className="navbar bg-base-200 shadow-sm px-4 py-2">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-40 sm:w-52 md:w-64"
        />
        <Link
          to="/exercisesinfo"
          className="link link-hover text-sm text-primary"
        >
          Exercises Information
        </Link>
        <p className="text-sm text-secondary">
          Showing {count} exercises in the database
        </p>
      </div>
    </div>
  );
}
