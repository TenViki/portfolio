import { useContext } from "react";
import { WebDataContext } from "../Router";
import { api } from "../api/server";

export const useWebData = () => {
  const context = useContext(WebDataContext);

  const refreshData = async () => {
    const response = await api.get("/");
    context.setData(response.data);
  };

  return {
    data: context.data,
    refreshData: refreshData,
  };
};
