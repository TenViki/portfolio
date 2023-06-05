import { api } from "./server";

interface SubscribeParams {
  email: string;
  name: string;
  language: string;
}

export const subscribe = async ({ email, name, language }: SubscribeParams) => {
  return api.request({
    method: "POST",
    url: "/mailing/subscribe",
    body: {
      email,
      name,
      language,
    },
  });
};
