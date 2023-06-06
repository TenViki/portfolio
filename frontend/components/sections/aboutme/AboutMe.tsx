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
import React from "react";
import { getBlogPosts } from "api/blog";
import { useQuery } from "react-query";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AnimatedBars = dynamic(() => import("./AnimatedBars"), {
  ssr: false,
});

const AboutMe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const blogPostsQuery = useQuery("blogPostsHomepage", () =>
    getBlogPosts({ limit: 3, offset: 0 })
  );

  const text = "About me";

  return (
    <ScrollAnimation inViewClassName={styles.in_view}>
      <div className={styles.about_me} ref={ref} id="about-me">
        <div className={styles.about_me_bgr}>
          <div className={styles.about_me_bgr_img}>
            <img src={"/images/portrait.jpg"} alt="Background image" />
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
          <ArrowScroll id="newsletter" facing="bottom" margin={2} />

          <div className={styles.about_me_spotify_widget}>
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
                Hey there! I'm Viki, a passionate{" "}
                {new Date().getFullYear() - new Date(2006, 1, 1).getFullYear()}
                -year-old web developer deeply enthralled by the world of
                frontend and backend development. My expertise lies in
                leveraging technologies like Next.js, React, and Nest.js to
                build captivating digital experiences. I thrive on the intricate
                details that make user interfaces come alive and the robust
                functionality that powers them. Always eager to learn and grow,
                I stay up to date with the latest industry trends to ensure I'm
                at the cutting edge of web development.
              </div>
            </ScrollAnimation>

            <div className={styles.blog_posts}>
              {blogPostsQuery.data?.map((post, i) => (
                <ScrollAnimation
                  animation="fade-in"
                  delay={300 + (i + 1) * 100}
                  key={post.id}
                >
                  <Link className={styles.blog_post} href={`/${post.slug}`}>
                    <div className={styles.blog_post_text}>
                      <div className={styles.blog_post_title}>{post.title}</div>
                      <div className={styles.blog_post_tags}>
                        {post.tags.map((tag) => tag.name).join(" • ")}
                      </div>
                    </div>

                    <div className={styles.blog_post_chevron}>
                      <FiChevronRight />
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation animation="fade-in" delay={800}>
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
