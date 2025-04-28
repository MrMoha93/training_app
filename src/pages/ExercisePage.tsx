import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise, getExercise } from "../services/ExerciseService";

export default function ExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise>();

  useEffect(() => {
    async function fetchExercise() {
      if (!id) return;

      const { data } = await getExercise(id);

      if (!data) return navigate("/not-found");

      setExercise(data);
    }
    fetchExercise();
  }, []);

  async function handleSave() {
    if (!id) return;

    const { data } = await getExercise(id);

    setExercise(data);
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
    </>
  );
}
