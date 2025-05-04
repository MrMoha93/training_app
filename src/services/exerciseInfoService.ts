import axios from "axios";
import { ExerciseInfo } from "../types";
import auth from "./authService";

const API_ENDPOINT = "http://localhost:6688/api/exercisesinfo";

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
