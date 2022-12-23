import React from "react";
import "./AnimatedBars.scss";

interface AnimatedBarsProps {
  reverse?: boolean;
}

const AnimatedBars: React.FC<AnimatedBarsProps> = ({ reverse }) => {
  const barWidth = 10;
  const [numberOfBars, setNumberOfBars] = React.useState(
    Math.floor(window.innerWidth / barWidth)
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
    <div className={`bar-wrapper ${reverse ? "reverse" : ""}`}>
      {Array.from({ length: numberOfBars }).map((_, index) => (
        <div
          key={index}
          className="bar-about-me"
          style={{ "--bar-width": barWidth } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default AnimatedBars;
