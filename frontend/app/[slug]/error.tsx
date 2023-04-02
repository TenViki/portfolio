"use client";

import React from "react";
import blogStyles from "../blog/blog.module.scss";
import Link from "next/link";

const BlogPostError = () => {
  return (
    <div className={blogStyles.not_found}>
      <h1>404</h1>
      <p>
        The page you are looking for does not exist. <br />
        You can go back to the{" "}
        <Link
          href={{
            pathname: "/",
          }}
        >
          homepage
        </Link>
      </p>
    </div>
  );
};

export default BlogPostError;
