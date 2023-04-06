import Link from "next/link";
import React, { CSSProperties, FC } from "react";
import { Tag as TagType } from "types/blog";
import styles from "./Tag.module.scss";

interface TagProps {
  tag: TagType;
}

const Tag: FC<TagProps> = ({ tag }) => {
  return (
    <Link
      href={`/blog/${tag.id}`}
      key={tag.id}
      className={styles.tag}
      style={
        {
          "--tag-color": tag.color,
          "--tag-color-background": tag.color + "33",
        } as CSSProperties
      }
    >
      {tag.name}
    </Link>
  );
};

export default Tag;
