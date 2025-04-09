import { useEffect, useState } from "react";
import { Exercise, getExercises } from "./services/fakeExerciseService";
import ExerciseModal from "./components/ExerciseModal";
import Exercises from "./components/Exercises";

export default function App() {
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
    <div>
      <h1 className="text-2xl font-semibold text-center py-10">Training App</h1>
      <div className="flex justify-center">
        <ExerciseModal onSave={handleSave} />
      </div>
      <Exercises exercises={exercises} />
    </div>
  );
}
