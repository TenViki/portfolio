import HeroText from "./HeroText";
import "./Hero.scss";
import React from "react";

const Hero = () => {
  const [hover, setHover] = React.useState(false);

  return (
    <div className={`hero ${hover ? "hover" : ""}`}>
      <div className="hero-text">
        <h1>Hey there! My name is Viki</h1>
        <h2>
          and I'm a <HeroText onHover={setHover} mouseOver={hover} />
        </h2>
      </div>
      <div className="hero-background">
        <div className="hero-background-1" />
        <div className="hero-background-2" />
      </div>
    </div>
  );
};

export default Hero;
