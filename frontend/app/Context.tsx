"use client";

import React from "react";
import { WebDataResponse } from "../types/data";
import { User } from "../types/auth";
import { useQuery } from "react-query";
import { getUserInfo, loginWithToken } from "../api/auth";
import { api } from "../api/server";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  if (typeof window !== "undefined") {
    useQuery("user", () => getUserInfo(localStorage.getItem("token")!), {
      enabled: !!window && !!localStorage.getItem("token"),
    });

    React.useEffect(() => {
      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (res) => {
          const data = await loginWithToken(res.credential);
          setUser(data.user);
          localStorage.setItem("token", data.token);
        },
        auto_select: true,
      });

      console.log("Google init", window.google);
    }, [window.google]);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/");
      setData(response.data);
      console.log(response.data);
      console.log("Deta have been fetchen");
    };

    console.log(window.google);

    console.log("Fetching data");
    fetchData();
  }, []);

  console.log(pathname);

  return (
    <WebDataContext.Provider value={{ data, setData }}>
      {children}
    </WebDataContext.Provider>
  );
}
