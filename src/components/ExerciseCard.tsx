import { Exercise } from "../types";

interface Props {
  exercises: Exercise[];
  modalRef: React.RefObject<HTMLDialogElement>;
  onSelect: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercises, modalRef, onSelect }: Props) {
  function handleSelectExercise(exercise: Exercise) {
    onSelect(exercise);
    modalRef.current?.showModal();
  }
  return (
    <div className="flex flex-wrap justify-center gap-5 p-5">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="card w-[400px] h-[180px] border border-black
 shadow-md cursor-pointer relative overflow-hidden transition-transform duration-300 hover:scale-103 "
          onClick={() => handleSelectExercise(exercise)}
        >
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                exercise.imageUrl ?? "/images/exercisepeople.png"
              })`,
            }}
          />

          <div className="relative z-10 px-3 py-2 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-md text-success">{exercise.name}</h2>
              <h2 className="text-sm card-title">
                {exercise.date.split("T")[0]}
              </h2>
            </div>
            <div className="absolute top-2 right-2">
              <i
                className="fas fa-pen text-secondary cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectExercise(exercise);
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
