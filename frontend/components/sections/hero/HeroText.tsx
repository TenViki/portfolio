import React, { CSSProperties, FC, useEffect } from "react";
import { wait } from "../../../utils/timing";
import Hero from "./Hero";
import styles from "./HeroText.module.scss";

const values: {
  name: string;
  color: [string, string];
}[] = [
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
  updateColors: (colors: [string, string]) => void;
}

const HeroText: FC<HeroTextProps> = ({ onHover, mouseOver, updateColors }) => {
  const [index, setIndex] = React.useState(-1);
  const [hidden, setHidden] = React.useState(false);
  const items = React.useRef<{ [key: number]: HTMLDivElement }>({});

  useEffect(() => {
    setIndex(0);
  }, []);

  useEffect(() => {
    if (index === -1) return;
    updateColors(values[index].color);
  }, [index]);

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
    <div className={styles.hero_text_container}>
      <div
        className={styles.hero_ima_above}
        style={{ "--length": index } as CSSProperties}
      >
        {values
          .filter((_, i) => i < index)
          .map((value, i) => (
            <div key={i} className={styles.hero_text_item}>
              {value.name}
            </div>
          ))}
      </div>
      <div
        className={`${styles.hero_ima} ${hidden ? styles.hidden : ""}`}
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
            className={`${styles.hero_ima_text} ${
              itemIndex === index ? styles.active : ""
            }`}
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

      <div className={styles.hero_ima_below}>
        {values
          .filter((_, i) => i > index)
          .map((value, i) => (
            <div key={i} className={styles.hero_text_item}>
              {value.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HeroText;
