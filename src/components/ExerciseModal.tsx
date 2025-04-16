import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise, saveExercise } from "../services/fakeExerciseService";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSave(exercise: Exercise): void;
}

export default function ExerciseModal({ onSave }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    const exercise = saveExercise(data);
    onSave(exercise);
    modalRef.current?.close();
    reset();
  }

  return (
    <>
      <button
        onClick={() => modalRef.current?.showModal()}
        className="btn btn-primary ml-2 "
      >
        New Exercise
      </button>
      <dialog id="modal" className="modal" ref={modalRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-box place-items-center"
        >
          <h1 className="font-bold ">New Exercise</h1>
          <input
            {...register("name")}
            placeholder="Name of exercise..."
            className="block input my-4"
          />

          <button className="btn btn-secondary ">Save</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
