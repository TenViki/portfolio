import { Auth, User } from "../types/auth";
import { api } from "./server";

export const loginWithToken = async (token: string) => {
  const response = await api.post<Auth>("/auth/login", { googleToken: token });
  return response.data;
};

export const getUserInfo = async (token: string) => {
  const response = await api.get<User>("/auth/me", {
    headers: { Authorization: token },
  });
  return response.data;
};
