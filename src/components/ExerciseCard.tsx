import { useNavigate } from "react-router-dom";
import { Exercise } from "../types";

interface Props {
  exercises: Exercise[];
}

export default function ExerciseCard({ exercises }: Props) {
  const navigate = useNavigate();

  function handleSelectExercise(exercise: Exercise) {
    navigate(`/exercises/${exercise.id}`);
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 p-5">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="card w-[400px] h-[180px] border border-neutral shadow-md cursor-pointer relative overflow-hidden transition-transform duration-300 hover:scale-103"
          onClick={() => handleSelectExercise(exercise)}
        >
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                exercise.imageUrl ?? "/images/exercisepeople.png"
              })`,
            }}
          />
          <div className="relative z-10 px-3 py-2 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-md text-success">{exercise.name}</h2>
              <h2 className="text-sm card-title">
                {exercise.date.split("T")[0]}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
