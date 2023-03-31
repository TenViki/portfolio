import { Auth, User } from "../types/auth";
import { api } from "./server";

export const loginWithToken = async (token: string) => {
  return api.request<Auth>({
    method: "POST",
    url: "/auth/login",
    body: { googleToken: token },
  });
};

export const getUserInfo = async (token: string) => {
  return api.request<User>({
    method: "GET",
    url: "/auth/me",
    useAuth: true,
  });
};
