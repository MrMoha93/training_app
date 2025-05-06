import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Exercise } from "../types";
import {
  deleteExercise,
  getExercise,
  getExercises,
} from "../services/exerciseService";
import SetModal from "../components/SetModal";
import EditModal from "../components/EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function ExercisePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editModalRef = useRef<HTMLDialogElement>(null);
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
  }, [id, navigate]);

  async function handleDelete() {
    if (!id || !exercise) return;
    if (exerciseCount <= 1) {
      setErrorMessage("You cannot delete the last exercise.");
      return;
    }
    await deleteExercise(id);
    navigate("/exercises", { state: { deletedId: id } });
  }

  function handleSaveExercise(updated: Exercise) {
    setExercise(updated);
  }

  async function handleSaveSets() {
    if (!id) return;
    const { data } = await getExercise(id);
    setExercise(data);
  }

  if (!exercise) return <h1>Loading exercise...</h1>;

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">
        <div className="relative mb-4">
          <h1 className="text-3xl font-bold text-center">{exercise.name}</h1>
          <button
            onClick={() => editModalRef.current?.showModal()}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-secondary cursor-pointer text-2xl"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>

        <p className="text-center text-sm text-secondary mb-4">
          Exercise Date: {exercise.date.split("T")[0]}
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
        <div className="flex justify-between items-center mt-4">
          <button onClick={handleDelete} className="btn btn-error">
            Delete Exercise
          </button>
          <SetModal onSave={handleSaveSets} sets={exercise.sets.length} />
        </div>
        <EditModal
          modalRef={editModalRef}
          selectedExercise={exercise}
          onSave={handleSaveExercise}
        />
      </div>
    </div>
  );
}
