import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../types";
import {
  deleteExercise,
  getExercise,
  getExercises,
} from "../services/exerciseService";

export default function ExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise>();
  const [exerciseCount, setExerciseCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchExercise() {
      if (!id) return;

      const { data } = await getExercise(id);

      if (!data) return navigate("/not-found");

      setExercise(data);

      const allExercises = await getExercises();
      setExerciseCount(allExercises.data.length);
    }
    fetchExercise();
  }, []);

  async function handleDelete() {
    if (!id) return;
    if (exerciseCount <= 1) {
      setErrorMessage("You cannot delete the last exercise.");
      return;
    }
    await deleteExercise(id);
    navigate("/exercises");
  }

  if (!exercise) return <h1>Loading exercise...</h1>;

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">{exercise.name}</h1>
        <p className="text-center text-sm text-gray-500 mb-4">
          Date for exercise: {exercise.date.split("T")[0]}
        </p>
        <ul>
          {exercise.sets.map((set, index) => (
            <li
              key={index}
              className="p-2 border border-gray-300 rounded-lg mb-2 shadow-sm bg-base-100"
            >
              <div className="flex justify-between text-sm">
                <span>
                  <span className="font-medium">Weight:</span>
                  {` ${set.weight} kg`}
                </span>
                <span>
                  <span className="font-medium">Reps:</span> {set.reps}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-start mt-4 text-error">
          {errorMessage && errorMessage}
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={handleDelete} className="btn btn-error">
            Delete Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
