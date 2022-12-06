import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import "./Button.scss";

interface ButtonProps {
  text: string;
  to: string;
}

const Button: React.FC<ButtonProps> = ({ text, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick} className="button">
      {text}
      <FiArrowRight />
    </button>
  );
};

export default Button;
