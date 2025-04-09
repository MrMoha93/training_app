import { Exercise } from "../services/fakeExerciseService";

interface Props {
  exercises: Exercise[];
}

export default function Exercises({ exercises }: Props) {
  return (
    <div className="container mx-auto p-5 grid place-items-center gap-5">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className=" grid place-items-center w-66 h-14 bg-primary text-sm font-semibold rounded-box hover:scale-110 cursor-pointer transition-transform ease-in-out duration-200"
        >
          {exercise.name}
        </div>
      ))}
    </div>
  );
}
