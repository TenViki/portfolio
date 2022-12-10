import React, { FC } from "react";
import { useInView } from "react-intersection-observer";
import "./ScrollAnimation.scss";

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: string;
  style?: React.CSSProperties;
  threshold?: number;
  delay?: number;
}

export const ScrollAnimation: FC<ScrollAnimationProps> = ({
  children,
  animation,
  style,
  threshold,
  delay,
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

  return (
    <div
      className={`scroll-animation ${animation || ""} ${
        hasBeenInView ? "in-view" : ""
      }`}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  );
};
