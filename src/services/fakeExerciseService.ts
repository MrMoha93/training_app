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

const exercises: Exercise[] = [
  { id: "1", name: "BenchPress", sets: [] },
  { id: "2", name: "Deadlifts", sets: [] },
  { id: "3", name: "Squats", sets: [] },
  { id: "4", name: "Situps", sets: [] },
  { id: "5", name: "Spinning", sets: [] },
];

export function saveSet(id: string, setData: SetFormData) {
  const exercise = getExercise(id);
  exercise?.sets.push(setData);
}

export function getExercises() {
  return exercises;
}

export function getExercise(id: string) {
  return exercises.find((exercise) => exercise.id === id);
}

export function saveExercise(exercise: ExerciseFormData) {
  const exerciseInDb =
    exercises.find((e) => e.id === exercise.id) || ({} as Exercise);

  exerciseInDb.name = exercise.name;

  if (!exerciseInDb.id) {
    exerciseInDb.id = Date.now().toString();
    exerciseInDb.sets = [];
    exercises.push(exerciseInDb);
  }

  return exerciseInDb;
}

export function deleteExercise(id: string) {
  const exerciseInDb = exercises.find((exercise) => exercise.id === id);

  if (exerciseInDb) exercises.splice(exercises.indexOf(exerciseInDb), 1);

  return exerciseInDb;
}
