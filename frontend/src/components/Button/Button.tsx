import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import "./Button.scss";
import {
  pageTransitionDuration,
  usePageTransition,
} from "../../utils/usePageTransition";

interface ButtonProps {
  text: string;
  to: string;
  direction?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({ text, to, direction }) => {
  const navigate = useNavigate();
  const { setTransition } = usePageTransition();

  const handleClick = () => {
    setTransition({
      transitioning: true,
      state: "entering",
      side: direction || "left",
    });

    setTimeout(() => {
      navigate(to);
    }, pageTransitionDuration);
  };

  return (
    <button onClick={handleClick} className="button">
      {text}
      <FiArrowRight />
    </button>
  );
};

export default Button;
