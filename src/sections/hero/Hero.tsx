import React from "react";
import HeroText from "./HeroText";

const Hero = () => {
  return (
    <div className="hero-background">
      <div className="hero-text">
        <h1>Hey there! My name is Viki</h1>
        <h2>
          and I'm a <HeroText />
        </h2>
      </div>
    </div>
  );
};

export default Hero;
