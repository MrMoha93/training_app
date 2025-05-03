import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveExercise } from "../services/exerciseService";
import { Exercise } from "../types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exerciseSchema, FormData } from "../schemas/exerciseSchema";
import cloudinaryService from "../services/cloudinaryService";

interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  selectedExercise: Exercise | null;
  onSave(exercise: Exercise): void;
  onReset: (resetFn: () => void) => void;
}

export default function ExerciseModal({
  onSave,
  modalRef,
  selectedExercise,
  onReset,
}: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(exerciseSchema),
  });

  useEffect(() => {
    onReset(reset);
  }, [onReset, reset]);

  async function onSubmit(data: FormData) {
    let uploadedImageUrl: string | undefined = undefined;

    if (data.images && data.images.length > 0) {
      uploadedImageUrl = await cloudinaryService.saveImage(data.images[0]);
    }

    const exerciseData = {
      id: selectedExercise?.id,
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

  useEffect(() => {
    if (!selectedExercise) {
      reset({
        name: "",
        date: "",
        weight: undefined as any,
        reps: undefined as any,
      });
      return;
    }

    const lastSet = selectedExercise.sets[selectedExercise.sets.length - 1];

    reset({
      name: selectedExercise.name,
      date: selectedExercise.date.split("T")[0],
      weight: lastSet?.weight ?? 0,
      reps: lastSet?.reps ?? 0,
    });
  }, [selectedExercise, reset]);

  return (
    <>
      <dialog id="modal" className="modal" ref={modalRef}>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
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
            min={new Date().toISOString().split("T")[0]}
            className="block input mt-4"
          />
          {errors.date && <p className="text-error">{errors.date.message}</p>}
          {selectedExercise?.imageUrl && (
            <div className="self-start mt-2">
              <img
                src={selectedExercise.imageUrl}
                alt={selectedExercise.name}
                width={80}
              />
            </div>
          )}
          {selectedExercise?.imageUrl ? (
            <p className="text-sm mb-1">Change Image (Optional):</p>
          ) : (
            <p className="text-sm mt-2">Upload Image (Optional):</p>
          )}
          <div className="w-full flex justify-center mt-4">
            <input
              type="file"
              {...register("images")}
              className="file-input file-input-bordered"
            />
          </div>
          {errors.images && (
            <p className="text-error mt-2">{errors.images.message}</p>
          )}
          {selectedExercise ? (
            <button
              type="button"
              className="btn btn-info mt-4"
              onClick={handleSubmit((data) => onSubmit(data))}
            >
              Confirm
            </button>
          ) : (
            <>
              <button type="submit" className="btn btn-info mt-4">
                Save
              </button>
            </>
          )}
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
