import { z } from "zod";

export const exerciseSchema = z.object({
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
        return ["image/png"].includes(fileList[0].type);
      },
      { message: "Only PNG images are allowed" }
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

export type FormData = z.infer<typeof exerciseSchema>;
