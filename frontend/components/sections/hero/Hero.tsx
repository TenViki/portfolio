"use client";

import HeroText from "./HeroText";
import styles from "./Hero.module.scss";
import React, { CSSProperties } from "react";
import { FaInstagram, FaGithub, FaDiscord } from "react-icons/fa";
import { copyToClipboard } from "../../../utils/clipboard";
import HeroButton from "./HeroButton";
import { FiArrowDown } from "react-icons/fi";

const Hero = () => {
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [colors, setColors] = React.useState<[string, string]>([
    "#8e44ad",
    "#2980b9",
  ]);

  const copyDiscord = () => {
    copyToClipboard("TenViki#3645");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const discordElement = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className={`${styles.hero} ${hover ? styles.hover : ""}`}
      id="hero"
      {...{ "x-data-hover": hover ? "true" : "false" }}
    >
      <div
        className={styles.hero_text}
        style={
          {
            "--color-1": colors[0],
            "--color-2": colors[1],
          } as CSSProperties
        }
      >
        <h1 className={styles.h1_big}>Hey there! My name is Viki</h1>
        <h1 className={styles.h1_small}>Hi! I'm Viki.</h1>
        <h2>
          and I'm a{" "}
          <HeroText
            onHover={(state) =>
              window.screen.availWidth > 1024 && setHover(state)
            }
            mouseOver={hover}
            updateColors={setColors}
          />
        </h2>
        <HeroButton />

        <div
          className={styles.hero_scroll}
          onClick={() => {
            const element = document.getElementById("about-me");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <FiArrowDown />
        </div>
      </div>

      <div className={styles.hero_icons}>
        <a href="https://www.instagram.com/tenviki28" target="_blank">
          <FaInstagram />
        </a>
        <a href="https://github.com/TenViki" target="_blank">
          <FaGithub />
        </a>
        <div
          className={`${styles.discord_copy_container} ${
            copied ? styles.active : ""
          }`}
          style={
            {
              "--width": discordElement.current?.offsetWidth,
            } as React.CSSProperties
          }
        >
          <div className={styles.discord_copy} ref={discordElement}>
            <span className={styles.discord_copy_progress} />
            TenViki#0001 copied to clipboard!
          </div>
        </div>

        <span onClick={copyDiscord}>
          <FaDiscord />
        </span>
      </div>
      <div className={styles.hero_background}>
        <div className={styles.hero_background_1} />
        <div className={styles.hero_background_2} />
      </div>
    </div>
  );
};

export default Hero;
