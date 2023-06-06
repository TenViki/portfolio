import { Tag } from "types/blog";
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

interface Preferences {
  preferences: Tag[];
  hasConfirmed: boolean;
  language: string;
  name: string;
}

export const getPreferences = async (id: string) => {
  return api.request<Preferences>({
    method: "GET",
    url: `/mailing/preferences/${id}`,
  });
};

interface UpdatePreferencesParams {
  id: string;
  preferences: string[];
  name: string;
  language: string;
}

export const updatePreferences = async ({
  id,
  preferences,
  name,
  language,
}: UpdatePreferencesParams) => {
  return api.request({
    method: "PATCH",
    url: `/mailing/preferences/${id}`,
    body: {
      preferences,
      name,
      language,
    },
  });
};

export const unsubscribe = async (id: string) => {
  return api.request({
    method: "POST",
    url: `/mailing/unsubscribe/${id}`,
  });
};
