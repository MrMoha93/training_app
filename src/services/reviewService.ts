import axios from "axios";
import { Review, ReviewFormData } from "../types";
import auth from "./authService";
import { BASE_URL } from "../constants";

const API_ENDPOINT = `${BASE_URL}/api/reviews`;

export function getReviews(exerciseInfoId: string) {
  const token = auth.getJwt();
  return axios.get<Review[]>(`${API_ENDPOINT}/${exerciseInfoId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function postReview(exerciseInfoId: string, data: ReviewFormData) {
  const token = auth.getJwt();
  return axios.post<Review>(`${API_ENDPOINT}/${exerciseInfoId}`, data, {
    headers: {
      "x-auth-token": token,
    },
  });
}

export function deleteReview(id: string) {
  const token = auth.getJwt();
  return axios.delete<Review>(`${API_ENDPOINT}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
}
