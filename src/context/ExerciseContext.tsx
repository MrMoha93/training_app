import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { getExercises } from "../services/exerciseService";
import { Exercise, ExerciseInfo } from "../types";
import { getExerciseInfos } from "../services/exerciseInfoService";

interface ExerciseContextValue {
  exercises: Exercise[];
  setExercises: Dispatch<SetStateAction<Exercise[]>>;
  exerciseInfos: ExerciseInfo[];
  setExerciseInfos: Dispatch<SetStateAction<ExerciseInfo[]>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const ExerciseContext = createContext<ExerciseContextValue | undefined>(
  undefined
);

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
  const context = useContext(ExerciseContext);
  if (!context)
    throw new Error("useExercises must be used within ExerciseProvider");
  return context;
}
