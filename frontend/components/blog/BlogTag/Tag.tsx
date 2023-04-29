import Link from "next/link";
import React, { CSSProperties, FC } from "react";
import { Tag as TagType } from "types/blog";
import styles from "./Tag.module.scss";

interface TagProps {
  tag: TagType;
  isNotLink?: boolean;
  active?: boolean;
}

const Tag: FC<TagProps> = ({ tag, isNotLink, active }) => {
  if (isNotLink)
    return (
      <div
        className={
          styles.tag + " " + styles.not_link + " " + (active && styles.active)
        }
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
      href={active ? `/blog/` : `/blog/${tag.slug}`}
      key={tag.id}
      className={styles.tag + " " + (active && styles.active)}
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
