import { Exercise } from "../services/ExerciseService";

interface Props {
  exercises: Exercise[];
  modalRef: React.RefObject<HTMLDialogElement>;
}

export default function Exercises({ exercises, modalRef }: Props) {
  return (
    <div className="container mx-auto p-5 grid place-items-center gap-5">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="relative card bg-base-100 image-full w-96 shadow-sm cursor-pointer"
          onClick={() => modalRef.current?.showModal()}
        >
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt={exercise.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{exercise.name}</h2>
            <i className="absolute top-2 right-2 fas fa-pen" />
          </div>
        </div>
      ))}
    </div>
  );
}
