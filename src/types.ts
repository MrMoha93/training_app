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

export interface ExerciseInfo {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  exerciseInfoId: string;
}

export interface ReviewFormData {
  rating: number;
  comment?: string;
}
