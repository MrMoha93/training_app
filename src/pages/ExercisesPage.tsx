import { useEffect, useRef, useState } from "react";
import { getExercise, getExercises } from "../services/exerciseService";
import { Exercise } from "../types";
import ExerciseModal from "../components/ExerciseModal";
import ExerciseCard from "../components/ExerciseCard";

export default function ExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const modalRef = useRef<HTMLDialogElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    async function fetchExercises() {
      const { data: exercises } = await getExercises();
      console.log("hämtade exercises", exercises);
      setExercises(exercises);
    }
    fetchExercises();
  }, []);

  async function handleSave(exercise: Exercise) {
    const { data: updatedExercise } = await getExercise(exercise.id);

    const existingExercise = exercises.find((e) => e.id === exercise.id);

    if (existingExercise) {
      const updatedExercises = exercises.map((e) => {
        if (e.id === exercise.id) return updatedExercise;
        return e;
      });

      setExercises(updatedExercises);
    } else {
      setExercises([...exercises, updatedExercise]);
    }
  }

  function handleNewExerciseClick() {
    setSelectedExercise(null);
    resetRef.current?.();
    modalRef.current?.showModal();
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-center py-5">
        Create, choose or edit an exercise
      </h1>
      <p className="text-center mt-2">
        Showing {exercises.length} exercises in the database
      </p>
      ;
      <div className="flex justify-center">
        <button
          className="btn btn-primary mb-5"
          onClick={handleNewExerciseClick}
        >
          New Exercise
        </button>
      </div>
      <div className="flex justify-center">
        <ExerciseModal
          onSave={handleSave}
          modalRef={modalRef}
          selectedExercise={selectedExercise}
          onReset={(resetFn) => (resetRef.current = resetFn)}
        />
      </div>
      <ExerciseCard
        exercises={exercises}
        modalRef={modalRef}
        onSelect={setSelectedExercise}
      />
    </>
  );
}
