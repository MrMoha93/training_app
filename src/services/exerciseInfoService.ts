import axios from "axios";
import { ExerciseInfo } from "../types";
import auth from "./authService";
import { BASE_URL } from "../constants";

const API_ENDPOINT = `${BASE_URL}/api/exercisesinfo`;

export function getExerciseInfos() {
  const token = auth.getJwt();
  return axios.get<ExerciseInfo[]>(API_ENDPOINT, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function getExerciseInfo(id: string) {
  const token = auth.getJwt();
  return axios.get<ExerciseInfo>(`${API_ENDPOINT}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
}
