"use client";

import React, { FC } from "react";
import { useInView } from "react-intersection-observer";
import "./ScrollAnimation.scss";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: string;
  style?: React.CSSProperties;
  threshold?: number;
  delay?: number;
  reset?: boolean;
  inViewClassName?: string;
}

export const ScrollAnimation: FC<ScrollAnimationProps> = ({
  children,
  animation,
  style,
  threshold,
  delay,
  reset,
  inViewClassName,
}) => {
  const [ref, inView, entry] = useInView({
    threshold: Math.max(threshold || 0, 0.01),
  });

  const [hasBeenInView, setHasBeenInView] = React.useState(false);

  React.useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setHasBeenInView(true);
      }, delay || 0);
    }
  }, [inView]);

  React.useEffect(() => {
    if (reset) {
      setHasBeenInView(false);
    }
  }, [reset]);

  return (
    <div
      className={`scroll-animation ${animation || ""} ${
        hasBeenInView ? inViewClassName ?? "in-view" : ""
      }`}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  );
};
