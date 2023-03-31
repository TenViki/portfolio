import React from "react";
import { FiArrowRight } from "react-icons/fi";
import styles from "./Button.module.scss";
import {
  pageTransitionDuration,
  usePageTransition,
} from "../../utils/usePageTransition";
import { useRouter } from "next/navigation";

interface ButtonProps {
  text: string;
  to: string;
  direction?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({ text, to, direction }) => {
  const navigate = useRouter();
  const { setTransition } = usePageTransition();

  const handleClick = () => {
    setTransition({
      transitioning: true,
      state: "entering",
      side: direction || "left",
    });

    setTimeout(() => {
      navigate.push(to);
    }, pageTransitionDuration);
  };

  return (
    <button onClick={handleClick} className={styles.button}>
      {text}
      <FiArrowRight />
    </button>
  );
};

export default Button;
