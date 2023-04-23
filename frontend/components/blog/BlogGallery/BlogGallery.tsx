"use client";

import { useDisclosure } from "@mantine/hooks";
import React, { CSSProperties, FC, useRef } from "react";
import styles from "./BlogGallery.module.scss";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

type VariantArgument = [number, boolean];

const variants = {
  enter: ([direction, opened]: VariantArgument) => {
    if (!opened || direction === 0)
      return {
        x: "-50%",
        y: "-50%",
        scale: 0.8,
      };

    return {
      x: `calc(-50% + ${direction > 0 ? 1000 : -1000}px)`,
      opacity: 0,
      y: "-50%",
    };
  },

  center: {
    x: "-50%",
    y: "-50%",
    opacity: 1,
    scale: 1,
  },

  exit: ([direction, opened]: VariantArgument) => {
    if (!opened || direction === 0)
      return {
        x: "-50%",
        y: "-50%",
        scale: 0.7,
      };
    return {
      x: `calc(-50% + ${direction < 0 ? 1000 : -1000}px)`,
      opacity: 0,
      y: "-50%",
    };
  },
};

const wrap = (min: number, max: number, v: number) => {
  // wrap around
  if (v < min) return max - ((min - v) % max);
  else return min + ((v - min) % max);
};

const BlogGallery: FC = () => {
  const [images, setImages] = React.useState<{ src: string; alt: string }[]>(
    []
  );
  const [opened, { open, close }] = useDisclosure(false);
  // const [currentImage, setCurrentImage] = React.useState(0);

  const [[page, direction], setPage] = React.useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    console.log("paginate", newDirection, page, direction);
    setPage([page + newDirection, newDirection]);
  };

  const setImage = (i: number) => {
    setPage(([page]) => [i, i > imageIndex ? 1 : -1]);
  };

  const imagesRef = useRef<HTMLDivElement[]>([]);

  React.useEffect(() => {
    if (!opened) setPage([images.length - 1, 0]);
  }, [opened]);

  React.useEffect(() => {
    const element = document.getElementById("blog-content");
    if (!element) return;

    const images = element.querySelectorAll(
      "img:not(.copy-button)"
    ) as NodeListOf<HTMLImageElement>;
    const imagesArray = Array.from(images);

    setImages(
      imagesArray.map((img) => ({
        src: img.src,
        alt: img.alt,
      }))
    );

    const handleImageClick = (i: number, src: string) => {
      const img = new Image();
      img.src = src;

      // setImage(i);
      setPage([i, 0]);

      // change cursor to loading
      document.body.style.cursor = "wait";

      img.onload = () => {
        open();
        document.body.style.cursor = "auto";
      };
    };

    images.forEach((img, i) => {
      img.addEventListener("click", handleImageClick.bind(null, i, img.src));
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }

      if (e.key === "ArrowRight") {
        paginate(1);
      }

      if (e.key === "ArrowLeft") {
        paginate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      images.forEach((img, i) => {
        img.removeEventListener(
          "click",
          handleImageClick.bind(null, i, img.src)
        );
      });

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [page, direction]);

  React.useEffect(() => {
    if (!imagesRef.current[imageIndex]) return;

    imagesRef.current[imageIndex].scrollIntoView({
      behavior: opened ? "smooth" : "auto",
      block: "center",
      inline: "center",
    });
  }, [imageIndex, opened]);

  return (
    <div className={styles.overlay + " " + (opened ? styles.opened : "")}>
      <div className={styles.close} onClick={close}>
        <FiX />
      </div>

      <div className={styles.current_image}>
        <button
          className={styles.slider_nav_button}
          onClick={() => {
            paginate(-1);
          }}
        >
          <FiChevronLeft />
        </button>

        <AnimatePresence custom={[direction, opened]} initial={false}>
          {opened && (
            <motion.img
              key={page}
              src={images[imageIndex]?.src}
              alt={images[imageIndex]?.alt}
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              // transition={
              // }

              style={{
                originX: "50%",
                originY: "50%",
                x: "-50%",
                y: "-50%",
              }}
              variants={variants}
              custom={[direction, opened]}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: {
                  ease: (x) => 1 - Math.pow(1 - x, 3),
                  duration: 0.4,
                  damping: 10,
                },
              }}
            />
          )}
        </AnimatePresence>

        <button
          className={styles.slider_nav_button}
          onClick={() => {
            paginate(1);
          }}
        >
          <FiChevronRight />
        </button>
      </div>

      <p className={styles.alt}>{images[imageIndex]?.alt}</p>

      <div className={styles.slider_nav}>
        {images.map((img, i) => (
          <div
            key={i}
            style={
              {
                "--index": Math.abs(imageIndex - i),
              } as CSSProperties
            }
            onClick={() => {
              setImage(i);
            }}
            className={
              styles.img_wrapper + " " + (imageIndex === i ? styles.active : "")
            }
            ref={(el) => el && (imagesRef.current[i] = el)}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGallery;
