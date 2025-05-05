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
  user: {
    name: string;
  };
  userId: string;
}

export interface ReviewFormData {
  rating: number;
  comment?: string;
}

export interface SetFormData {
  weight: number;
  reps: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  isAdmin: boolean;
}

export interface UserRegister {
  name: string;
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
