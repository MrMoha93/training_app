import { useEffect, useState } from "react";
import { Exercise, getExercises } from "../services/fakeExerciseService";
import ExerciseModal from "../components/ExerciseModal";
import Exercises from "../components/Exercises";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const exercises = [...getExercises()];
    setExercises(exercises);
  }, []);

  function handleSave(exercise: Exercise) {
    const existingExercise = exercises.find((e) => e.id === exercise.id);

    if (existingExercise) {
      const updatedExercises = exercises.map((e) => {
        if (e.id === exercise.id) return exercise;
        return e;
      });

      setExercises(updatedExercises);
    } else {
      setExercises([...exercises, exercise]);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-center py-10">Training App</h1>
      <div className="flex justify-center">
        <ExerciseModal onSave={handleSave} />
      </div>
      <Exercises exercises={exercises} />
    </>
  );
}
