import "./AboutMe.scss";
import portrait from "../../assets/images/portrait.jpg";
import { FiArrowRight } from "react-icons/fi";
import Button from "../../components/Button/Button";

const AmoutMe = () => {
  return (
    <div className="container">
      <div className="aboutme-content">
        <div className="aboutme-text">
          <h2 className="title">Who am I?</h2>
          <p>
            I am a 16 year old web developer from Czech Republic. I am currently
            studying at the{" "}
            <a href="https://www.spseiostrava.cz/en/" className="link">
              Upper Secondary Technical School of Electrical Engineering
            </a>{" "}
            in Ostrava.
          </p>

          <p>
            I am a self-taught web developer. I started learning web development
            in 2017, when I created my{" "}
            <a href="http://og.vikithedev.eu/" className="link">
              first ever website
            </a>
          </p>

          <Button text="See my blog" to="/blog" />
        </div>
        <img src={portrait} alt="Portrait of me" className="portrait" />
      </div>
    </div>
  );
};

export default AmoutMe;
