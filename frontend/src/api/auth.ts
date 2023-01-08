import { api } from "./server";

export const loginWithToken = async (token: string) => {
  const response = await api.post("/auth/login", { googleToken: token });

  return response.data;
};
