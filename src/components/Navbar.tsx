import { Link } from "react-router-dom";
import { useExercises } from "../context/ExerciseContext";

export default function Navbar() {
  const { exercises, searchQuery, setSearchQuery } = useExercises();

  const filtered = searchQuery
    ? exercises.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : exercises;

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
          className="link link-hover text-md text-primary"
        >
          Exercises Information
        </Link>
        <p className="text-sm text-gray-600 whitespace-nowrap">
          Showing {filtered.length} exercises in the database
        </p>
      </div>
    </div>
  );
}
