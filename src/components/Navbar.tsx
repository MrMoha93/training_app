import { useExercises } from "../context/ExerciseContext";

export default function Navbar() {
  const { exercises } = useExercises();

  return (
    <div className="navbar bg-base-200 shadow-sm px-4 py-2">
      <div className="flex gap-4 items-center w-full">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-64"
        />
        <p className="text-sm text-gray-600">
          Showing {exercises.length} exercises in the database
        </p>
      </div>
    </div>
  );
}
