import { useContext } from "react";
import { WebDataContext } from "../Router";

export const useWebData = () => {
  const context = useContext(WebDataContext);

  return context.data;
};
