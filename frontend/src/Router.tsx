import React from "react";
import { Route, Routes } from "react-router";
import App from "./MainPage";
import { api } from "./api/server";
import { WebDataResponse } from "./types/data";
import { getUserInfo, loginWithToken } from "./api/auth";
import { User } from "./types/auth";
import { UserContext } from "./utils/useUser";
import { useQuery } from "react-query";

export const WebDataContext = React.createContext<{
  data: WebDataResponse | null;
  setData: (data: WebDataResponse) => void;
}>({
  data: null,
  setData: () => {},
});

const Router = () => {
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
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
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
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </UserContext.Provider>
    </WebDataContext.Provider>
  );
};

export default Router;
