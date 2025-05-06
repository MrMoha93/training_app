import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveExercise } from "../services/exerciseService";
import { Exercise } from "../types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  newExerciseSchema,
  NewExerciseFormData,
} from "../schemas/newExerciseSchema";
import cloudinaryService from "../services/cloudinaryService";

interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  onSave(exercise: Exercise): void;
  onReset: (resetFn: () => void) => void;
}

export default function NewExerciseModal({ onSave, modalRef, onReset }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewExerciseFormData>({
    resolver: zodResolver(newExerciseSchema),
  });

  useEffect(() => {
    onReset(reset);
  }, [onReset, reset]);

  async function onSubmit(data: NewExerciseFormData) {
    let uploadedImageUrl: string | undefined = undefined;

    if (data.images?.length) {
      uploadedImageUrl = await cloudinaryService.saveImage(data.images[0]);
    }

    const exerciseData = {
      name: data.name,
      date: data.date,
      imageUrl: uploadedImageUrl,
      sets: [
        {
          weight: data.weight,
          reps: data.reps,
        },
      ],
    };

    const { data: exercise } = await saveExercise(exerciseData);
    onSave(exercise);
    modalRef.current?.close();
    reset();

    navigate(`/exercises/${exercise.id}`);
  }

  return (
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
          type="number"
          step="any"
          {...register("weight")}
          placeholder="Weight"
          className="block input mt-4"
        />
        {errors.weight && <p className="text-error">{errors.weight.message}</p>}

        <input
          {...register("reps")}
          placeholder="Reps"
          className="block input mt-4"
        />
        {errors.reps && <p className="text-error">{errors.reps.message}</p>}

        <input
          type="date"
          {...register("date")}
          min={new Date().toISOString().split("T")[0]}
          className="block input mt-4"
        />
        {errors.date && <p className="text-error">{errors.date.message}</p>}

        <p className="text-sm mt-2">Upload Image (Optional):</p>
        <div className="w-full flex justify-center mt-2">
          <input
            type="file"
            {...register("images")}
            className="file-input file-input-bordered"
          />
        </div>
        {errors.images && (
          <p className="text-error mt-2">{errors.images.message}</p>
        )}

        <button type="submit" className="btn btn-success mt-4">
          Save
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
