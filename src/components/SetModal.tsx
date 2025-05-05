import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveSet } from "../services/exerciseService";
import { useParams } from "react-router-dom";

const schema = z.object({
  weight: z.coerce.number().gt(1, "Weight must be at least 1"),
  reps: z.coerce.number().gt(1, "Reps must be at least 1"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSave(): void;
  sets: number;
}

export default function SetModal({ onSave, sets }: Props) {
  const { id } = useParams();
  const modalRef = useRef<HTMLDialogElement>(null);
  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState("");

  async function onSubmit(data: FormData) {
    if (!id) return;
    if (sets >= 3) {
      setError("You cannot add more than 3 sets");
      return;
    }
    setError("");
    await saveSet(id, data);
    onSave();
    modalRef.current?.close();
    reset();
  }

  function openModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button onClick={openModal} className="btn btn-success">
        New Set
      </button>

      <dialog id="modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h1 className="font-bold text-center mb-4">New Set</h1>

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
            {error && <p className="text-error">{error}</p>}
            <button className="btn btn-secondary">Save</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
