import axios from "axios";
import { Exercise, ExerciseFormData } from "../types";

export function getExercises() {
  return axios.get<Exercise[]>("http://localhost:6688/api/exercises");
}

export function getExercise(id: string) {
  return axios.get<Exercise>(`http://localhost:6688/api/exercises/${id}`);
}

export function saveExercise(exercise: ExerciseFormData) {
  if (exercise.id)
    return axios.put<Exercise>(
      `http://localhost:6688/api/exercises/${exercise.id}`,
      exercise
    );

  return axios.post<Exercise>(`http://localhost:6688/api/exercises`, exercise);
}

export function deleteExercise(id: string) {
  return axios.delete<Exercise>(`http://localhost:6688/api/exercises/${id}`);
}
