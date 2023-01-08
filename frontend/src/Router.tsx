import React from "react";
import { Route, Routes } from "react-router";
import App from "./MainPage";
import { api } from "./api/server";
import { WebDataResponse } from "./types/data";
import { loginWithToken } from "./api/auth";

export const WebDataContext = React.createContext<{
  data: WebDataResponse | null;
  setData: (data: WebDataResponse) => void;
}>({
  data: null,
  setData: (data: WebDataResponse) => {},
});

const Router = () => {
  const [data, setData] = React.useState<WebDataResponse | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/");
      setData(response.data);
      console.log(response.data);
    };

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (res) => loginWithToken(res.credential),
      auto_select: true,
    });

    fetchData();
  }, []);

  return (
    <WebDataContext.Provider value={{ data, setData }}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </WebDataContext.Provider>
  );
};

export default Router;
