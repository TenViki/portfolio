"use client";

import { useDisclosure } from "@mantine/hooks";
import React, { CSSProperties, FC } from "react";
import styles from "./BlogGallery.module.scss";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const BlogGallery: FC = () => {
  const [images, setImages] = React.useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const element = document.getElementById("blog-content");
    if (!element) return;

    const images = element.querySelectorAll("img");
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

    return () => {
      images.forEach((img, i) => {
        img.removeEventListener(
          "click",
          handleImageClick.bind(null, i, img.src)
        );
      });
    };
  }, []);

  return (
    <div className={styles.overlay + " " + (opened ? styles.opened : "")}>
      <div className={styles.close} onClick={close}>
        <FiX />
      </div>
      <div className={styles.current_image}>
        <button
          className={styles.slider_nav_button}
          onClick={() => setCurrentImage(currentImage - 1)}
          disabled={currentImage === 0}
        >
          <FiChevronLeft />
        </button>
        <img src={images[currentImage]} alt="Image gallery" />
        <button
          className={styles.slider_nav_button}
          onClick={() => setCurrentImage(currentImage + 1)}
          disabled={currentImage === images.length - 1}
        >
          <FiChevronRight />
        </button>
      </div>

      <div className={styles.slider_nav}>
        {images.map((img, i) => (
          <img
            src={img}
            key={i}
            alt="Image gallery"
            onClick={() => setCurrentImage(i)}
            className={currentImage === i ? styles.active : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogGallery;
