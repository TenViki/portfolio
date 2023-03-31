"use client";

import React from "react";
import { WebDataResponse } from "../types/data";
import { User } from "../types/auth";
import { useQuery } from "react-query";
import { getUserInfo, loginWithToken } from "../api/auth";
import { api } from "../api/server";
import { UserContext, useUser } from "../utils/useUser";

export const WebDataContext = React.createContext<{
  data: WebDataResponse | null;
  setData: (data: WebDataResponse) => void;
}>({
  data: null,
  setData: () => {},
});

export default function AppContextSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = React.useState<WebDataResponse | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  if (typeof window !== "undefined") {
    useQuery("user", () => getUserInfo(localStorage.getItem("token")!), {
      enabled: !!window && !!localStorage.getItem("token"),
      onSuccess: (data) => {
        setUser(data);
        console.log("Authenticated user");
      },
      refetchOnWindowFocus: false,
    });

    React.useEffect(() => {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (res) => {
          const data = await loginWithToken(res.credential);
          console.log(data);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          console.log("Authenticated user");

          console.log(data);
        },
        auto_select: true,
      });
    }, [window.google]);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/");
      setData(response.data);
      console.log(response.data);
    };

    console.log(window.google);

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <WebDataContext.Provider value={{ data, setData }}>
        {children}
      </WebDataContext.Provider>
    </UserContext.Provider>
  );
}
