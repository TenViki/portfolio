"use client";

import React from "react";
import { WebDataResponse } from "../types/data";
import { User } from "../types/auth";
import { useQuery } from "react-query";
import { getUserInfo, loginWithToken } from "../api/auth";
import { api } from "../api/server";

export const WebDataContext = React.createContext<{
  data: WebDataResponse | null;
  setData: (data: WebDataResponse) => void;
}>({
  data: null,
  setData: () => {},
});

export default function AppContextSettings(children: React.ReactNode) {
  const [data, setData] = React.useState<WebDataResponse | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  useQuery("user", () => getUserInfo(localStorage.getItem("token")!), {
    enabled: !!localStorage.getItem("token"),
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/");
      setData(response.data);
      console.log(response.data);
    };

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (res) => {
        const data = await loginWithToken(res.credential);
        setUser(data.user);
        localStorage.setItem("token", data.token);
      },
      auto_select: true,
    });

    fetchData();
  }, []);

  return (
    <WebDataContext.Provider value={{ data, setData }}>
      {children}
    </WebDataContext.Provider>
  );
}
