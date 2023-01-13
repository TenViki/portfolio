import React from "react";
import { Route, Routes, useLocation } from "react-router";
import App from "./MainPage";
import { api } from "./api/server";
import { WebDataResponse } from "./types/data";
import { getUserInfo, loginWithToken } from "./api/auth";
import { User } from "./types/auth";
import { UserContext } from "./utils/useUser";
import { useQuery } from "react-query";
import {
  TransitionContext,
  TransitionType,
  usePageTransition,
} from "./utils/usePageTransition";
import PageTransition from "./components/PageTransition/PageTransition";
import Blog from "./pages/blog/Blog";

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
  const location = useLocation();

  const [pageTransition, setPageTransition] = React.useState<TransitionType>({
    side: "left",
    state: "entered",
    transitioning: false,
  });

  useQuery("user", () => getUserInfo(localStorage.getItem("token")!), {
    enabled: !!localStorage.getItem("token"),
  });

  React.useEffect(() => {
    // if first load, don't transition
    if (pageTransition.state === "entered") return;

    setTimeout(() => {
      setPageTransition((prev) => ({
        ...prev,
        state: "exited",
      }));
    }, 50);
  }, [location]);

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
        <TransitionContext.Provider
          value={{
            transition: pageTransition,
            setTransition: setPageTransition,
          }}
        >
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<App />} />
          </Routes>

          <PageTransition />
        </TransitionContext.Provider>
      </UserContext.Provider>
    </WebDataContext.Provider>
  );
};

export default Router;
