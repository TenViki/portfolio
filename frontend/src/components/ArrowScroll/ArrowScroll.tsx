import React from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import "./ArrowScroll.scss";

interface ArrowScrollProps {
  id: string;
  facing: "top" | "bottom";
}

const ArrowScroll: React.FC<ArrowScrollProps> = ({ facing, id }) => {
  return (
    <div
      className={`scroll-arrow ${facing}`}
      onClick={() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }}
    >
      {facing === "top" ? <FiArrowUp /> : <FiArrowDown />}
    </div>
  );
};

export default ArrowScroll;
