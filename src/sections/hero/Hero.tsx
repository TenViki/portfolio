import HeroText from "./HeroText";
import "./Hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Hey there! My name is Viki</h1>
        <h2>
          and I'm a <HeroText />
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
