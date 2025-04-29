import { useNavigate } from "react-router-dom";
import { Exercise } from "../services/ExerciseService";

interface Props {
  exercises: Exercise[];
  modalRef: React.RefObject<HTMLDialogElement>;
  onSelect: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercises, modalRef, onSelect }: Props) {
  const navigate = useNavigate();

  function handleSelectExercise(exercise: Exercise) {
    onSelect(exercise);
    modalRef.current?.showModal();
  }
  return (
    <div className="container mx-auto p-5 grid place-items-center gap-5">
      {exercises.map((exercise) => (
        <div
          className="relative card bg-base-100 image-full w-96 shadow-sm cursor-pointer"
          onClick={() => navigate(`/exercises/${exercise.id}`)}
        >
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt={exercise.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{exercise.name}</h2>
            <i
              className="absolute top-2 right-2 fas fa-pen cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectExercise(exercise);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
