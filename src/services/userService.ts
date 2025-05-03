import axios from "axios";
import auth from "./authService";
import { UserRegister } from "../types";

const API_ENDPOINT = "http://localhost:6688/api/users";

async function register(user: UserRegister) {
  const { headers, data } = await axios.post(API_ENDPOINT, user);
  const token = headers["x-auth-token"];
  auth.loginWithJwt(token);
  return data;
}

export default {
  register,
};
