import { createContext, useContext } from "react";

export interface TransitionType {
  transitioning: boolean;
  side: "left" | "right";
  state: "entering" | "entered" | "exiting" | "exited";
}

export const pageTransitionDuration = 500;

export const TransitionContext = createContext<{
  transition: TransitionType;
  setTransition: React.Dispatch<React.SetStateAction<TransitionType>>;
}>({
  transition: {
    transitioning: false,
    side: "left",
    state: "exited",
  },
  setTransition: () => {},
});

export const usePageTransition = () => {
  const { transition, setTransition: setTr } = useContext(TransitionContext);

  const setTransition = (s: Partial<TransitionType>) => {
    setTr((prev) => ({ ...prev, ...s }));
  };

  return { transition, setTransition };
};
