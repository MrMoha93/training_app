import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Exercise, saveExercise } from "../services/ExerciseService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cloudinaryService from "../services/cloudinaryService";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  weight: z.coerce
    .number({ invalid_type_error: "Weight must be a number" })
    .gte(1, { message: "Weight must be at least 1" }),
  reps: z.coerce
    .number({ invalid_type_error: "Reps must be a number" })
    .gte(1, { message: "Reps must be at least 1" }),
  images: z
    .instanceof(FileList)
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        return ["image/png", "image/jpg"].includes(fileList[0].type);
      },
      { message: "Only PNG/JPG images are allowed" }
    )
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        return fileList[0].size <= 5_000_000;
      },
      {
        message: "Maximum file size allowed is 5 MB",
      }
    )
    .optional(),
});

type FormData = z.infer<typeof schema>;

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
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    onReset(reset);
  }, [onReset, reset]);

  async function onSubmit(data: FormData, goToExercise = false) {
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

    if (goToExercise) navigate(`/exercises/${exercise.id}`);
  }

  async function handleSaveAndOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const isValid = await trigger();
    if (!isValid) return;

    const values = getValues();
    values.weight = Number(values.weight);
    values.reps = Number(values.reps);

    await onSubmit(values, true);
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
          <button className="btn btn-secondary mt-4">Save</button>
          <button
            type="button"
            className="btn btn-secondary mt-4 ml-2"
            onClick={handleSaveAndOpen}
          >
            Save & Open
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
