import React, { CSSProperties, FC, useEffect } from "react";
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
    name: "UI/UX designer",
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

interface HeroTextProps {
  onHover: (hover: boolean) => void;
  mouseOver: boolean;
}

const HeroText: FC<HeroTextProps> = ({ onHover, mouseOver }) => {
  const [index, setIndex] = React.useState(-1);
  const [hidden, setHidden] = React.useState(false);
  const items = React.useRef<{ [key: number]: HTMLDivElement }>({});

  useEffect(() => {
    setIndex(0);
  }, []);

  // pause on hover
  useEffect(() => {
    if (mouseOver) {
      setHidden(false);
      return;
    }

    const interval = setInterval(async () => {
      setHidden(true);
      await wait(750);
      setIndex((prev) => (prev + 1) % values.length);
      setHidden(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [items, mouseOver]);

  return (
    <div className="hero-text-container">
      <div
        className="hero-ima-above"
        style={{ "--length": index } as CSSProperties}
      >
        {values
          .filter((_, i) => i < index)
          .map((value, i) => (
            <div key={i} className="hero-text-item">
              {value.name}
            </div>
          ))}
      </div>
      <div
        className={`hero-ima ${hidden ? "hidden" : ""}`}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        style={
          {
            "--index": index,
            "--width": items.current[index]?.offsetWidth,
            "--length": values.length,
          } as CSSProperties
        }
      >
        {values.map((value, itemIndex) => (
          <div
            key={itemIndex}
            className={`hero-ima-text ${itemIndex === index ? "active" : ""}`}
            ref={(el) => {
              if (el) items.current[itemIndex] = el;
            }}
            style={
              {
                "--color-1": value.color[0],
                "--color-2": value.color[1],
                "--idx": itemIndex,
              } as CSSProperties
            }
          >
            {value.name}
          </div>
        ))}
      </div>

      <div className="hero-ima-below">
        {values
          .filter((_, i) => i > index)
          .map((value, i) => (
            <div key={i} className="hero-text-item">
              {value.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HeroText;
