import "./AboutMe.scss";
import portrait from "../../assets/images/portrait.jpg";
import { FiArrowRight } from "react-icons/fi";
import Button from "../../components/Button/Button";
import { ScrollAnimation } from "../../components/ScrollAnimation/ScrollAnimation";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import BezierEasing from "bezier-easing";

const AboutMe = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!ref.current) return;

    const scroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const refFromTop = ref.current.offsetTop;

    const topTreshold = ref.current.offsetTop;
    const bottomTreshold = ref.current.offsetTop + ref.current.offsetHeight;

    const scrollScore = Math.min(
      Math.max((scroll - topTreshold) / (bottomTreshold - topTreshold), -1),
      1
    );

    ref.current.style.setProperty("--scroll", `${scrollScore}`);
  };
  useEffect(() => {
    document.body.addEventListener("scroll", handleScroll);

    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const text = "ABOUT ME";

  return (
    <ScrollAnimation threshold={0.05}>
      <div className="about-me" ref={ref}>
        <div className="about-me-bgr">
          <div className="about-me-bgr-img">
            <img src={portrait} alt="" />
          </div>
        </div>

        <div className="about-me-content-wrapper">
          <div className="about-me-content">
            <ScrollAnimation>
              <div className="about-me-title">
                {text.split("").map((letter, index) => (
                  <pre
                    className="letter"
                    key={index}
                    style={
                      {
                        "--delay": index / text.length,
                      } as React.CSSProperties
                    }
                  >
                    {letter}
                  </pre>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={100}>
              <div className="about-me-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Cupiditate deserunt odio ducimus labore quis vitae voluptas
                impedit ex sit quidem. Soluta voluptates illum nihil, explicabo
                labore rerum, vitae eligendi neque atque sequi alias amet earum
                cumque velit, quos dolores ex illo! Minus architecto earum
                ducimus cupiditate quibusdam iure iste totam?
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={200}>
              <div className="about-me-button">
                <Button text="See my blog" to="/about" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default AboutMe;
