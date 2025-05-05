import axios from "axios";
import { Exercise, ExerciseFormData, SetFormData } from "../types";
import auth from "./authService";
import { BASE_URL } from "../constants";

const API_ENDPOINT = `${BASE_URL}/api/exercises`;

export function getExercises() {
  const token = auth.getJwt();
  return axios.get<Exercise[]>(API_ENDPOINT, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function getExercise(id: string) {
  const token = auth.getJwt();
  return axios.get<Exercise>(`${API_ENDPOINT}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function saveExercise(exercise: ExerciseFormData) {
  const token = auth.getJwt();

  if (exercise.id) {
    return axios.put<Exercise>(`${API_ENDPOINT}/${exercise.id}`, exercise, {
      headers: {
        "x-auth-token": token,
      },
    });
  }

  return axios.post<Exercise>(API_ENDPOINT, exercise, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function saveSet(id: string, setData: SetFormData) {
  const token = auth.getJwt();
  return axios.post<SetFormData>(`${API_ENDPOINT}/${id}/sets`, setData, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function deleteExercise(id: string) {
  const token = auth.getJwt();
  return axios.delete<Exercise>(`${API_ENDPOINT}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
}
