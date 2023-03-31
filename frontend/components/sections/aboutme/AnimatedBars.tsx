"use client";

import React from "react";
import styles from "./AnimatedBars.module.scss";

interface AnimatedBarsProps {
  reverse?: boolean;
}

const AnimatedBars: React.FC<AnimatedBarsProps> = ({ reverse }) => {
  const barWidth = 10;
  const [numberOfBars, setNumberOfBars] = React.useState(
    Math.floor(typeof window !== "undefined" ? window.innerWidth / barWidth : 0)
  );

  React.useEffect(() => {
    const handleResize = () => {
      setNumberOfBars(Math.floor(window.innerWidth / barWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`${styles.bar_wrapper} ${styles.reverse ? "reverse" : ""}`}>
      {Array.from({ length: numberOfBars }).map((_, index) => (
        <div
          key={index}
          className={styles.bar_about_me}
          style={{ "--bar-width": barWidth } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default AnimatedBars;
