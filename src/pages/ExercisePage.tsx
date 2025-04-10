import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise, getExercise } from "../services/fakeExerciseService";
import SetModal from "../components/SetModal";

export default function ExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise>();

  // @ts-ignore
  useEffect(() => {
    if (!id) return;

    const exercise = getExercise(id);

    if (!exercise) return navigate("/not-found");

    setExercise(exercise);
  }, []);

  function handleSave() {
    const exercise = getExercise(id!);
    if (!exercise) throw new Error("Exercise was not found");
    setExercise({ ...exercise });
  }

  if (!exercise) return <h1>Loading exercise...</h1>;

  return (
    <>
      <h1 className="text-3xl font-bold m-5 text-center">{exercise.name}</h1>
      <ul className="ml-5">
        {exercise.sets.map((set, index) => (
          <li key={index} className="text-xl">
            <div className="flex w-full flex-col">
              <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
                Weight: {set.weight} - Repetition: {set.reps}
              </div>
              {index !== exercise.sets.length - 1 && (
                <div className="divider"></div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <SetModal onSave={handleSave} />
    </>
  );
}
