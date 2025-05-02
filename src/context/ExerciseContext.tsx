import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getExercises } from "../services/exerciseService";
import { Exercise, ExerciseInfo } from "../types";
import { getExerciseInfos } from "../services/exerciseInfoService";

const ExerciseContext = createContext({
  exercises: [] as Exercise[],
  setExercises: (_: Exercise[]) => {},
  searchQuery: "",
  setSearchQuery: (_: string) => {},
  exerciseInfos: [] as ExerciseInfo[],
  setExerciseInfos: (_: ExerciseInfo[]) => {},
});

export default function ExerciseProvider({ children }: PropsWithChildren) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseInfos, setExerciseInfos] = useState<ExerciseInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getExercises().then((res) => setExercises(res.data));
    getExerciseInfos().then((res) => setExerciseInfos(res.data));
  }, []);

  return (
    <ExerciseContext.Provider
      value={{
        exercises,
        searchQuery,
        setExercises,
        setSearchQuery,
        exerciseInfos,
        setExerciseInfos,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercises() {
  return useContext(ExerciseContext);
}
