import React, { FC } from "react";
import blogStyles from "../blog/blog.module.scss";
import BlogHeader from "components/blog/BlogHeader/BlogHeader";

const BlogPostLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={blogStyles.blog_container}>
      <BlogHeader />
      {children}
    </div>
  );
};

export default BlogPostLayout;
