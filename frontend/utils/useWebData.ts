import { useContext } from "react";
import { WebDataContext } from "../app/Context";
import { api } from "../api/server";
import { WebDataResponse } from "types/data";

export const useWebData = () => {
  const context = useContext(WebDataContext);

  const refreshData = async () => {
    const response = await api.request<WebDataResponse>({
      method: "GET",
      url: "/",
    });
    context.setData(response);
  };

  return {
    data: context.data,
    refreshData: refreshData,
  };
};
