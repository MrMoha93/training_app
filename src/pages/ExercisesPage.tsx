import { useEffect, useRef, useState } from "react";
import { getExercise } from "../services/exerciseService";
import Pagination, { PAGE_SIZE, paginate } from "../components/Pagination";
import { Exercise } from "../types";
import { useExercises } from "../context/ExerciseContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewExerciseModal from "../components/NewExerciseModal";
import ExerciseCard from "../components/ExerciseCard";

export default function ExercisesPage() {
  const { exercises, searchQuery, setExercises } = useExercises();

  const modalRef = useRef<HTMLDialogElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.deletedId) {
      setExercises((previous) =>
        previous.filter((e) => e.id !== location.state.deletedId)
      );

      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location.state]);

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
    resetRef.current?.();
    modalRef.current?.showModal();
  }

  function sortByDate(exercises: Exercise[]) {
    return [...exercises].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  const filtered = searchQuery
    ? exercises.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : exercises;

  const sortedExercises = sortByDate(filtered);
  const paginatedExercises = paginate(sortedExercises, PAGE_SIZE, currentPage);

  return (
    <div className="mb-10">
      <h1 className="text-2xl font-semibold text-center py-5">
        Create, read, update or delete an exercise
      </h1>
      <div className="flex justify-center">
        <button
          className="btn btn-success mb-5"
          onClick={handleNewExerciseClick}
        >
          New Exercise
        </button>
      </div>
      <div className="flex justify-center">
        <NewExerciseModal
          onSave={handleSave}
          modalRef={modalRef}
          onReset={(resetFn) => (resetRef.current = resetFn)}
        />
      </div>
      <ExerciseCard exercises={paginatedExercises} />
      <div className="mt-6 flex justify-center">
        <Pagination
          totalCount={filtered.length}
          pageSize={PAGE_SIZE}
          selectedPage={currentPage}
          onPageSelect={setCurrentPage}
        />
      </div>
    </div>
  );
}
