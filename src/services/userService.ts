import axios from "axios";
import auth from "./authService";
import { UserRegister } from "../types";
import { BASE_URL } from "../constants";

const API_ENDPOINT = `${BASE_URL}/api/users`;

async function register(user: UserRegister) {
  const { headers, data } = await axios.post(API_ENDPOINT, user);
  const token = headers["x-auth-token"];
  auth.loginWithJwt(token);
  return data;
}

export default {
  register,
};
