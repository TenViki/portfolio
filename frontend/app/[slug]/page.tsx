import Link from "next/link";
import React, { CSSProperties, FC } from "react";
import styles from "./BlogPost.module.scss";
import blogStyles from "../blog/blog.module.scss";
import { BlogPost } from "types/blog";
import { getFileUrl } from "utils/files";
import BlogHeader from "components/blog/BlogHeader/BlogHeader";

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
    <>
      <div className={blogStyles.blog_container}>
        <BlogHeader />
        <div
          className={
            styles.header + " " + (data.banner ? styles.with_banner : "")
          }
        >
          {data.banner && (
            <>
              <img
                className={styles.banner_img}
                src={getFileUrl(data.banner.id)}
              />
              <div className={styles.overlay} />
            </>
          )}

          <h1>{data.title}</h1>

          <div className={styles.user}>
            <img src={data.author.picture} alt="Userpfp" />
            <span className={styles.username}>{data.author.name}</span>{" "}
            <span className={styles.date}>
              {new Date(data.createdAt).toLocaleDateString("cs")}
            </span>
          </div>
        </div>

        <div className={styles.tags}>
          {data.tags.map((tag) => (
            <Link
              href={`/blog/tag/${tag.id}`}
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
          ))}
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        ></div>
      </div>
    </>
  );
};

export default BlogPost;
