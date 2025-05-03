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
    <div className="bg-base-200 shadow-sm px-4 py-2 relative">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Link
          to="/exercisesinfo"
          className="text-md font-semibold text-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 transition duration-500 hover:scale-100 hover:text-blue-900"
        >
          EXERCISES-INFO
        </Link>
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full sm:w-64 md:w-72"
        />
        <p className="text-sm text-secondary text-center md:text-right">
          Showing {count} exercises in the database
        </p>
      </div>
    </div>
  );
}
