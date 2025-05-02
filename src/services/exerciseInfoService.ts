import axios from "axios";
import { ExerciseInfo } from "../types";

export function getExerciseInfos() {
  return axios.get<ExerciseInfo[]>("http://localhost:6688/api/exercisesinfo");
}

export function getExerciseInfo(id: string) {
  return axios.get<ExerciseInfo>(
    `http://localhost:6688/api/exercisesinfo/${id}`
  );
}
