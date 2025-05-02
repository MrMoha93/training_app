import { useRef, useState } from "react";
import { getExercise } from "../services/exerciseService";
import Pagination, { PAGE_SIZE, paginate } from "../components/Pagination";
import { Exercise } from "../types";
import { useExercises } from "../context/ExerciseContext";
import ExerciseModal from "../components/ExerciseModal";
import ExerciseCard from "../components/ExerciseCard";

export default function ExercisesPage() {
  const { exercises, setExercises } = useExercises();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const modalRef = useRef<HTMLDialogElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  function sortByDate(exercises: Exercise[]) {
    return [...exercises].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  const sortedExercises = sortByDate(exercises);
  const paginatedExercises = paginate(sortedExercises, PAGE_SIZE, currentPage);

  return (
    <div className="mb-10">
      <h1 className="text-2xl font-semibold text-center py-5">
        Create or edit an exercise
      </h1>
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
        exercises={paginatedExercises}
        modalRef={modalRef}
        onSelect={setSelectedExercise}
      />
      <div className="mt-6 flex justify-center">
        <Pagination
          totalCount={exercises.length}
          pageSize={PAGE_SIZE}
          selectedPage={currentPage}
          onPageSelect={setCurrentPage}
        />
      </div>
    </div>
  );
}
