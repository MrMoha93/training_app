export interface ExerciseSet {
  weight: number;
  reps: number;
}

export interface ExerciseFormData {
  id?: string;
  name: string;
  date: string;
  imageUrl?: string;
  sets: ExerciseSet[];
}

export interface Exercise {
  id: string;
  name: string;
  date: string;
  imageUrl?: string;
  sets: ExerciseSet[];
}
