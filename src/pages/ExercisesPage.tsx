import { useEffect, useRef, useState } from "react";
import { Exercise, getExercises } from "../services/ExerciseService";
import ExerciseModal from "../components/ExerciseModal";
import Exercises from "../components/Exercises";

export default function ExercisesPage() {
  const modalRef = useRef<HTMLDialogElement>(null);
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
        <button
          className="btn btn-primary mb-5"
          onClick={() => modalRef.current?.showModal()}
        >
          New Exercise
        </button>
      </div>
      <div className="flex justify-center">
        <ExerciseModal onSave={handleSave} modalRef={modalRef} />
      </div>
      <Exercises exercises={exercises} modalRef={modalRef} />
    </>
  );
}
