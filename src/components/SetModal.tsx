import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveSet } from "../services/ExerciseService";
import { useParams } from "react-router-dom";

const schema = z.object({
  weight: z.coerce.number().gt(1, "Weight must be at least 1"),
  reps: z.coerce.number().gt(1, "Reps must be at least 1"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSave(): void;
}

export default function SetModal({ onSave }: Props) {
  const { id } = useParams();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    if (!id) return;
    await saveSet(id, data);
    onSave();
    modalRef.current?.close();
    reset();
  }

  return (
    <>
      <div className="text-center">
        <button
          onClick={() => modalRef.current?.showModal()}
          className="btn btn-primary ml-5 mt-4 "
        >
          New Set
        </button>
      </div>
      <dialog id="modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h1 className="font-bold text-center mb-4 ">New Set</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid place-items-center gap-4"
          >
            <input
              {...register("weight")}
              placeholder="Weight"
              className="block input"
            />
            <input
              {...register("reps")}
              placeholder="Reps"
              className="block input"
            />
            <button className="btn btn-secondary ">Save</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
