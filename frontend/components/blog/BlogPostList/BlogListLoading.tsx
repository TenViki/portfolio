import { Loader } from "@mantine/core";
import React, { FC } from "react";

interface BlogListLoadingProps {
  onIntersect: () => void;
}

const BlogListLoading: FC<BlogListLoadingProps> = ({ onIntersect }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        rootMargin: "0px 0px 100% 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, onIntersect]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 16,
      }}
    >
      <Loader color="#e74c3c" />
    </div>
  );
};

export default BlogListLoading;
