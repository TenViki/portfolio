import BlogHeader from "components/blog/BlogHeader/BlogHeader";
import Link from "next/link";
import React from "react";
import { BlogPost, Tag as TagType } from "types/blog";
import styles from "./blog.module.scss";
import Tag from "components/blog/BlogTag/Tag";
import BlogTags from "components/blog/BlogTag/BlogTags";
import BlogPostList from "components/blog/BlogPostList/BlogPostList";

const getPosts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  const data = (await response.json()) as BlogPost[];
  return data;
};

const getTags = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/tags`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  const data = (await response.json()) as TagType[];
  return data;
};

const BlogPage = async () => {
  const [posts, tags] = await Promise.all([getPosts(), getTags()]);

  return (
    <div>
      <BlogHeader linkBackHref="/" linkBackText="Home" />
      <h1 className={styles.title}>Blog posts</h1>
      <BlogTags tags={tags} />

      <div className={styles.posts}>
        {posts.map((post) => (
          <BlogPostList post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
