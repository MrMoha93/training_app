import { Link } from "react-router-dom";
import { Exercise } from "../services/ExerciseService";

interface Props {
  exercises: Exercise[];
}

export default function Exercises({ exercises }: Props) {
  return (
    <div className="container mx-auto p-5 grid place-items-center gap-5">
      {exercises.map((exercise) => (
        <Link
          to={`/exercises/${exercise.id}`}
          key={exercise.id}
          className=" relative grid place-items-center w-66 h-14 bg-primary bg-opacity-100 text-sm font-semibold rounded-box cursor-pointer hover:bg-opacity-80"
        >
          {exercise.name} <i className="absolute top-2 right-2 fas fa-pen" />
        </Link>
      ))}
    </div>
  );
}
