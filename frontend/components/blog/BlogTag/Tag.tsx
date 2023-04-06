import Link from "next/link";
import React, { CSSProperties, FC } from "react";
import { Tag as TagType } from "types/blog";
import styles from "./Tag.module.scss";

interface TagProps {
  tag: TagType;
  isNotLink?: boolean;
}

const Tag: FC<TagProps> = ({ tag, isNotLink }) => {
  if (isNotLink)
    return (
      <div
        className={styles.tag + " " + styles.not_link}
        style={
          {
            "--tag-color": tag.color,
            "--tag-color-background": tag.color + "33",
          } as CSSProperties
        }
      >
        {tag.name}
      </div>
    );

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
