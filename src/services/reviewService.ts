import axios from "axios";
import { Review, ReviewFormData } from "../types";

export function getReviews(exerciseInfoId: string) {
  return axios.get<Review[]>(
    `http://localhost:6688/api/reviews/${exerciseInfoId}`
  );
}

export function postReview(exerciseInfoId: string, data: ReviewFormData) {
  return axios.post<Review>(
    `http://localhost:6688/api/reviews/${exerciseInfoId}`,
    data
  );
}
