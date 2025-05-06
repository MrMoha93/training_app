import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editExerciseSchema, FormData } from "../schemas/editExerciseSchema";
import { saveExercise } from "../services/exerciseService";
import cloudinaryService from "../services/cloudinaryService";
import { Exercise } from "../types";

interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  selectedExercise: Exercise;
  onSave(updated: Exercise): void;
}

export default function EditModal({
  modalRef,
  selectedExercise,
  onSave,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editExerciseSchema),
  });

  const { fields } = useFieldArray({ control, name: "sets" });

  useEffect(() => {
    reset({
      name: selectedExercise.name,
      date: selectedExercise.date.split("T")[0],
      sets: selectedExercise.sets.map((s) => ({
        weight: s.weight,
        reps: s.reps,
      })),
      images: undefined,
    });
  }, [selectedExercise, reset]);

  async function onSubmit(data: FormData) {
    let imageUrl = selectedExercise.imageUrl;

    if (data.images?.length) {
      imageUrl = await cloudinaryService.saveImage(data.images[0]);
    }

    if (!imageUrl) {
      imageUrl = "/images/exercisepeople.png";
    }

    const editExerciseData = {
      id: selectedExercise.id,
      name: data.name,
      date: data.date,
      imageUrl,
      sets: data.sets.map(({ weight, reps }) => ({ weight, reps })),
    };

    const { data: saved } = await saveExercise(editExerciseData);
    onSave(saved);
    modalRef.current?.close();
  }

  return (
    <dialog ref={modalRef} className="modal">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="modal-box place-items-center"
      >
        <h1 className="font-bold text-xl mb-4">Edit Exercise</h1>
        <input
          {...register("name")}
          placeholder="Name"
          className="block input mt-2"
        />
        {errors.name && <p className="text-error">{errors.name.message}</p>}
        <input
          type="date"
          {...register("date")}
          className="block input mt-2"
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.date && <p className="text-error">{errors.date.message}</p>}
        <div className="flex flex-col gap-2 mt-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex gap-2 items-start justify-center"
            >
              <div className="flex flex-col items-center">
                <input
                  {...register(`sets.${index}.weight`, { valueAsNumber: true })}
                  placeholder="Weight"
                  className="input w-24"
                />
                {errors.sets?.[index]?.weight && (
                  <p className="text-error text-sm">
                    {errors.sets[index]?.weight?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <input
                  {...register(`sets.${index}.reps`, { valueAsNumber: true })}
                  placeholder="Reps"
                  className="input w-24"
                />
                {errors.sets?.[index]?.reps && (
                  <p className="text-error text-sm">
                    {errors.sets[index]?.reps?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {selectedExercise.imageUrl && (
          <>
            <div className="self-start mt-2">
              <img
                src={selectedExercise.imageUrl}
                alt={selectedExercise.name}
                width={80}
              />
            </div>
            <p className="text-sm mb-1">Change Image (Optional):</p>
          </>
        )}
        {!selectedExercise.imageUrl && (
          <p className="text-sm mt-2">Upload Image (Optional):</p>
        )}
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
