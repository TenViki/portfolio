import React, { CSSProperties, useEffect } from "react";
import { wait } from "../../utils/timing";
import "./HeroText.scss";

const values = [
  {
    name: "software engineer",
    color: ["#8e44ad", "#2980b9"],
  },
  {
    name: "web developer",
    color: ["#16a085", "#2ecc71"],
  },
  {
    name: "UI/UX Designer",
    color: ["#d35400", "#f1c40f"],
  },
  {
    name: "freelancer",
    color: ["#2980b9", "#27ae60"],
  },
  {
    name: "powerpoint expert",
    color: ["#e74c3c", "#d35400"],
  },
];

const HeroText = () => {
  const [index, setIndex] = React.useState(-1);
  const [hidden, setHidden] = React.useState(false);
  const items = React.useRef<{ [key: number]: HTMLDivElement }>({});

  useEffect(() => {
    setIndex(0);

    const interval = setInterval(async () => {
      setHidden(true);
      await wait(750);
      setIndex((prev) => (prev + 1) % values.length);
      setHidden(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div
      className={`hero-ima ${hidden ? "hidden" : ""}`}
      style={
        {
          "--index": index,
          "--width": items.current[index]?.offsetWidth,
        } as CSSProperties
      }
    >
      {values.map((value, index) => (
        <div
          key={index}
          className="hero-ima-text"
          ref={(el) => {
            if (el) items.current[index] = el;
          }}
          style={
            {
              "--color-1": value.color[0],
              "--color-2": value.color[1],
            } as CSSProperties
          }
        >
          {value.name}
        </div>
      ))}
    </div>
  );
};

export default HeroText;
