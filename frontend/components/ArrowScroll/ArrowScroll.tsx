import React from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import styles from "./ArrowScroll.module.scss";

interface ArrowScrollProps {
  id: string;
  facing: "top" | "bottom";
  margin?: number;
}

const ArrowScroll: React.FC<ArrowScrollProps> = ({ facing, id, margin }) => {
  return (
    <div
      className={`${styles.scroll_arrow} ${styles[facing]}`}
      style={{ "--margin": margin } as React.CSSProperties}
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
