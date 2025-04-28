import { useEffect, useState } from "react";
import { Exercise, getExercises } from "../services/ExerciseService";
import ExerciseModal from "../components/ExerciseModal";
import Exercises from "../components/Exercises";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    async function fetchExercises() {
      const { data: exercises } = await getExercises();
      console.log("hämtade exercises", exercises);
      setExercises(exercises);
    }
    fetchExercises();
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
      <h1 className="text-2xl font-semibold text-center py-10">
        Choose or Create Exercise
      </h1>
      <div className="flex justify-center">
        <ExerciseModal onSave={handleSave} />
      </div>
      <Exercises exercises={exercises} />
    </>
  );
}
