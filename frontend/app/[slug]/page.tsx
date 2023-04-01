import Link from "next/link";
import React, { FC } from "react";
import styles from "./BlogPost.module.scss";
import blogStyles from "../blog/blog.module.scss";
import { BlogPost } from "types/blog";
import { getFileUrl } from "utils/files";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const fetchPostData = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${slug}`,
    {
      cache: "no-cache",
    }
  );
  const data = (await response.json()) as BlogPost;
  return data;
};

const BlogPost = async ({ params }: BlogPostProps) => {
  const data = await fetchPostData(params.slug);

  return (
    <div className={blogStyles.blog_container}>
      <div className={styles.header}>
        <Link href={"/blog"}>Go back</Link>
        <h1>{data.title}</h1>
      </div>

      {data.banner ? (
        <div className={styles.banner}>
          <img src={getFileUrl(data.banner.id)} />
        </div>
      ) : null}

      <div className={styles.content}>{data.content}</div>
    </div>
  );
};

export default BlogPost;
