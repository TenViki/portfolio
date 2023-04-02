"use client";

import { useDisclosure } from "@mantine/hooks";
import React, { CSSProperties, FC, useRef } from "react";
import styles from "./BlogGallery.module.scss";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const BlogGallery: FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [currentImage, setCurrentImage] = React.useState(0);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  React.useEffect(() => {
    const element = document.getElementById("blog-content");
    if (!element) return;

    const images = element.querySelectorAll(
      "img:not(.copy-button)"
    ) as NodeListOf<HTMLImageElement>;
    const imagesArray = Array.from(images);

    setImages(imagesArray.map((img) => img.src));

    const handleImageClick = (i: number, src: string) => {
      setCurrentImage(i);

      const img = new Image();
      img.src = src;

      img.onload = () => {
        open();
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
        setCurrentImage((prev) => (prev + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
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
  }, []);

  React.useEffect(() => {
    if (!imagesRef.current[currentImage]) return;

    imagesRef.current[currentImage].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [currentImage]);

  return (
    <div className={styles.overlay + " " + (opened ? styles.opened : "")}>
      <div className={styles.close} onClick={close}>
        <FiX />
      </div>
      <div className={styles.current_image}>
        <button
          className={styles.slider_nav_button}
          onClick={() =>
            currentImage === 0
              ? setCurrentImage(images.length - 1)
              : setCurrentImage(currentImage - 1)
          }
        >
          <FiChevronLeft />
        </button>
        <img src={images[currentImage]} alt="Image gallery" />
        <button
          className={styles.slider_nav_button}
          onClick={() =>
            currentImage === images.length - 1
              ? setCurrentImage(0)
              : setCurrentImage(currentImage + 1)
          }
        >
          <FiChevronRight />
        </button>
      </div>

      <div className={styles.slider_nav}>
        {images.map((img, i) => (
          <div
            key={i}
            style={
              {
                "--index": i,
              } as CSSProperties
            }
            onClick={() => setCurrentImage(i)}
            className={
              styles.img_wrapper +
              " " +
              (currentImage === i ? styles.active : "")
            }
            ref={(el) => el && (imagesRef.current[i] = el)}
          >
            <img src={img} alt="Image gallery" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGallery;
