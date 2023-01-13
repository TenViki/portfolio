import { User } from "../types/auth";
import { createContext, useContext } from "react";

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  return { user, setUser };
};
