"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ArrowScroll from "../../../components/ArrowScroll/ArrowScroll";
import Button from "../../../components/Button/Button";
import { ScrollAnimation } from "../../../components/ScrollAnimation/ScrollAnimation";
import { getColorAtPercentage } from "../../../utils/timing";
import Spotify from "./Spotify";
import styles from "./AboutMe.module.scss";
import dynamic from "next/dynamic";

const AnimatedBars = dynamic(() => import("./AnimatedBars"), {
  ssr: false,
});

const AboutMe = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!ref.current) return;

    const scroll =
      document.body.scrollTop || document.documentElement.scrollTop;

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

  const text = "About me";

  return (
    <ScrollAnimation inViewClassName={styles.in_view}>
      <div className={styles.about_me} ref={ref} id="about-me">
        <div className={styles.about_me_bgr}>
          <div className={styles.about_me_bgr_img}>
            <Image src={"/images/portrait.jpg"} fill alt="Background image" />
          </div>
        </div>

        <div className={styles.about_me_content_wrapper}>
          <div className={styles.about_me_bars_top}>
            <AnimatedBars />
          </div>

          <div className={styles.about_me_bars_bottom}>
            <AnimatedBars reverse={true} />
          </div>
          <ArrowScroll id="hero" facing="top" margin={2} />
          <ArrowScroll id="hero" facing="bottom" margin={2} />

          <div className="about-me-spotify-widget">
            <Spotify />
          </div>

          <div className={styles.about_me_content}>
            <ScrollAnimation inViewClassName={styles.in_view}>
              <div className={styles.about_me_title}>
                {text.split("").map((letter, index) => (
                  <pre
                    className={styles.letter}
                    key={index}
                    style={
                      {
                        "--delay": index / text.length,
                        "--grad-from": getColorAtPercentage(
                          "#d35400",
                          "#f1c40f",
                          index / text.length
                        ),
                        "--grad-to": getColorAtPercentage(
                          "#d35400",
                          "#f1c40f",
                          (index + 1) / text.length
                        ),
                      } as React.CSSProperties
                    }
                  >
                    {letter}
                  </pre>
                ))}
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={300}>
              <div className={styles.about_me_text}>
                I am{" "}
                {new Date().getFullYear() - new Date(2006, 1, 1).getFullYear()}{" "}
                years old. Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Cupiditate deserunt odio ducimus labore quis vitae
                voluptas impedit ex sit quidem. Soluta voluptates illum nihil,
                explicabo labore rerum, vitae eligendi neque atque sequi alias
                amet earum cumque velit, quos dolores ex illo! Minus architecto
                earum ducimus cupiditate quibusdam iure iste totam?
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={600}>
              <div className="about-me-button">
                <Button text="See my blog" to="/blog" />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default AboutMe;
