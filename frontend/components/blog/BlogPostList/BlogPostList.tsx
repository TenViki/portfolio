import Link from "next/link";
import React, { FC } from "react";
import { BlogPost } from "types/blog";
import { getFileUrl } from "utils/files";

import styles from "./BlogPostList.module.scss";
import Tag from "../BlogTag/Tag";

interface BlogPostListProps {
  post: BlogPost;
}

const BlogPostList: FC<BlogPostListProps> = ({ post }) => {
  return (
    <Link href={"/" + post.slug} className={styles.link}>
      <div
        className={
          styles.header + " " + (post.banner ? styles.with_banner : "")
        }
      >
        {post.banner && (
          <>
            <img
              className={styles.banner_img}
              src={getFileUrl(post.banner.id)}
            />
            <div className={styles.overlay} />
          </>
        )}

        <h1>{post.title}</h1>

        <div className={styles.user}>
          <img src={post.author.picture} alt="Userpfp" />
          <span className={styles.username}>{post.author.name}</span>{" "}
          <span className={styles.date}>
            {new Date(post.createdAt).toLocaleDateString("cs")}
          </span>
        </div>

        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <Tag tag={tag} key={tag.id} isNotLink={true} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogPostList;
