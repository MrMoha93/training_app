import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getExercises } from "../services/exerciseService";
import { Exercise } from "../types";

const ExerciseContext = createContext({
  exercises: [] as Exercise[],
  setExercises: (_: Exercise[]) => {},
  searchQuery: "",
  setSearchQuery: (_: string) => {},
});

export default function ExerciseProvider({ children }: PropsWithChildren) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getExercises().then((res) => setExercises(res.data));
  }, []);

  return (
    <ExerciseContext.Provider
      value={{ exercises, searchQuery, setExercises, setSearchQuery }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercises() {
  return useContext(ExerciseContext);
}
