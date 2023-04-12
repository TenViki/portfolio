"use client";

import { useDisclosure } from "@mantine/hooks";
import React, { CSSProperties, FC, useRef } from "react";
import styles from "./BlogGallery.module.scss";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

const BlogGallery: FC = () => {
  const [images, setImages] = React.useState<{ src: string; alt: string }[]>(
    []
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [currentImage, setCurrentImage] = React.useState(0);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  const [loading, setLoading] = React.useState(false);

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
      setCurrentImage(i);

      const img = new Image();
      img.src = src;

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
        setCurrentImage((prev) => (prev + 1) % images.length);
        setLoading(true);
      }

      if (e.key === "ArrowLeft") {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        setLoading(true);
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
      behavior: opened ? "smooth" : "auto",
      block: "center",
      inline: "center",
    });
  }, [currentImage, opened]);

  return (
    <div className={styles.overlay + " " + (opened ? styles.opened : "")}>
      <div className={styles.close} onClick={close}>
        <FiX />
      </div>

      <div className={styles.current_image}>
        {loading && (
          <div className={styles.loading}>
            <div className={styles.loading_spinner}></div>
          </div>
        )}
        <button
          className={styles.slider_nav_button}
          onClick={() => {
            currentImage === 0
              ? setCurrentImage(images.length - 1)
              : setCurrentImage(currentImage - 1);
            setLoading(true);
          }}
        >
          <FiChevronLeft />
        </button>
        <img
          src={images[currentImage]?.src}
          alt={images[currentImage]?.alt}
          onLoad={() => {
            setLoading(false);
          }}
        />
        <button
          className={styles.slider_nav_button}
          onClick={() => {
            currentImage === images.length - 1
              ? setCurrentImage(0)
              : setCurrentImage(currentImage + 1);
            setLoading(true);
          }}
        >
          <FiChevronRight />
        </button>
      </div>

      <p className={styles.alt}>{images[currentImage]?.alt}</p>

      <div className={styles.slider_nav}>
        {images.map((img, i) => (
          <div
            key={i}
            style={
              {
                "--index": Math.abs(currentImage - i),
              } as CSSProperties
            }
            onClick={() => {
              setCurrentImage(i);
              setLoading(true);
            }}
            className={
              styles.img_wrapper +
              " " +
              (currentImage === i ? styles.active : "")
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
