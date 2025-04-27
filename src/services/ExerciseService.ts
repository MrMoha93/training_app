import axios from "axios";

interface ExirciseSet {
  weight: number;
  reps: number;
}

interface ExerciseFormData {
  id?: string;
  name: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExirciseSet[];
}

interface SetFormData {
  weight: number;
  reps: number;
}

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

export function saveSet(id: string, setData: SetFormData) {
  return axios.post<SetFormData>(
    `http://localhost:6688/api/exercises/${id}/sets`,
    setData
  );
}

export function deleteExercise(id: string) {
  return axios.delete<Exercise>(`http://localhost:6688/api/exercises/${id}`);
}
