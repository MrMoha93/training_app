import { useEffect, useState } from "react";
import { Exercise, getExercises } from "../services/fakeExerciseService";
import ExerciseModal from "../components/ExerciseModal";
import Exercises from "../components/Exercises";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const exercises = getExercises();
    setExercises(exercises);
  });

  function handleSave() {
    const exercises = getExercises();
    setExercises([...exercises]);
  }

  return (
    <>
      <div className="flex justify-center">
        <ExerciseModal onSave={handleSave} />
      </div>
      <Exercises exercises={exercises} />
    </>
  );
}
