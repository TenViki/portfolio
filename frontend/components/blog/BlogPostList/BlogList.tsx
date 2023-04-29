import React, { FC } from "react";
import { BlogPost } from "types/blog";
import BlogPostList from "./BlogPostList";
import styles from "app/blog/blog.module.scss";

const getPosts = async (tagSlug?: string) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`;

  if (tagSlug) {
    url += `?tag=${tagSlug}`;
  }

  const response = await fetch(url, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  const data = (await response.json()) as BlogPost[];
  return data;
};

interface BlogPostProps {
  tag?: string;
}

const BlogList = async ({ tag }: BlogPostProps) => {
  const posts = await getPosts(tag);

  return (
    <div className={styles.posts}>
      {posts.map((post) => (
        <BlogPostList post={post} key={post.id} />
      ))}
    </div>
  );
};

export default BlogList;
