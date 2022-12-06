import HeroText from "./HeroText";
import "./Hero.scss";
import React, { CSSProperties } from "react";
import { FaInstagram, FaGithub, FaDiscord } from "react-icons/fa";
import { copyToClipboard } from "../../utils/clipboard";
import HeroButton from "./HeroButton";

const Hero = () => {
  const [hover, setHover] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [colors, setColors] = React.useState<[string, string]>([
    "#8e44ad",
    "#2980b9",
  ]);

  const copyDiscord = () => {
    copyToClipboard("TenViki#0001");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const discordElement = React.useRef<HTMLDivElement>(null);

  return (
    <div className={`hero ${hover ? "hover" : ""}`}>
      <div
        className="hero-text"
        style={
          {
            "--color-1": colors[0],
            "--color-2": colors[1],
          } as CSSProperties
        }
      >
        <h1 className="h1-big">Hey there! My name is Viki</h1>
        <h1 className="h1-small">Hi! I'm Viki.</h1>
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
      </div>
      <div className="hero-icons">
        <a href="https://www.instagram.com/tenviki28" target="_blank">
          <FaInstagram />
        </a>
        <a href="https://github.com/TenViki" target="_blank">
          <FaGithub />
        </a>
        <div
          className={`discord-copy-container ${copied ? "active" : ""}`}
          style={
            {
              "--width": discordElement.current?.offsetWidth,
            } as React.CSSProperties
          }
        >
          <div className={`discord-copy`} ref={discordElement}>
            <span className="discord-copy-progress" />
            TenViki#0001 copied to clipboard!
          </div>
        </div>

        <span onClick={copyDiscord}>
          <FaDiscord />
        </span>
      </div>
      <div className="hero-background">
        <div className="hero-background-1" />
        <div className="hero-background-2" />
      </div>
    </div>
  );
};

export default Hero;
