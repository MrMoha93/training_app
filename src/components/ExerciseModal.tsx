import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise, saveExercise } from "../services/ExerciseService";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  weight: z.coerce
    .number({ invalid_type_error: "Weight must be a number" })
    .gte(1, { message: "Weight must be at least 1" }),
  reps: z.coerce
    .number({ invalid_type_error: "Reps must be a number" })
    .gte(1, { message: "Reps must be at least 1" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSave(exercise: Exercise): void;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export default function ExerciseModal({ onSave, modalRef }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const payload = {
      name: data.name,
      date: data.date,
      sets: [
        {
          weight: data.weight,
          reps: data.reps,
        },
      ],
    };

    const { data: exercise } = await saveExercise(payload);
    onSave(exercise);
    modalRef.current?.close();
    reset();
  }

  return (
    <>
      <dialog id="modal" className="modal" ref={modalRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-box place-items-center"
        >
          <h1 className="font-bold">New Exercise</h1>
          <input
            {...register("name")}
            placeholder="Name of exercise"
            className="block input mt-4"
          />
          {errors.name && <p className="text-error">{errors.name.message}</p>}
          <input
            {...register("weight")}
            placeholder="Weight"
            className="block input mt-4"
          />
          {errors.weight && (
            <p className="text-error">{errors.weight.message}</p>
          )}
          <input
            {...register("reps")}
            placeholder="Reps"
            className="block input mt-4"
          />
          {errors.reps && <p className="text-error">{errors.reps.message}</p>}
          <input
            type="date"
            {...register("date")}
            className="block input mt-4"
          />
          {errors.date && <p className="text-error">{errors.date.message}</p>}
          <button className="btn btn-secondary mt-2">Save</button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
