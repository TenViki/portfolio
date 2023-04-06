"use client";

import { getTags } from "api/tags";
import React, { CSSProperties, FC } from "react";
import { useQuery } from "react-query";

import styles from "./BlogTags.module.scss";
import Tag from "./Tag";
import { Tag as TagType } from "types/blog";

interface BlogTagsProps {
  activeTag?: string;
  tags: TagType[];
}

const BlogTags: FC<BlogTagsProps> = ({ activeTag, tags }) => {
  const [active, setActive] = React.useState(activeTag || "all");
  const [showTags, setShowTags] = React.useState(false);
  const [height, setHeight] = React.useState(0);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setActive(activeTag || "all");
  }, [activeTag]);

  React.useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  return (
    <div>
      <button
        className={styles.show_tags}
        onClick={() => setShowTags(!showTags)}
      >
        {showTags ? "Hide" : "Show"} tags
      </button>

      <div
        className={styles.tags_wrapper + " " + (showTags && styles.active)}
        style={
          {
            "--height": height + "px",
          } as CSSProperties
        }
      >
        <div className={styles.tags} ref={ref}>
          {tags.map((tag) => (
            <Tag tag={tag} key={tag.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogTags;
