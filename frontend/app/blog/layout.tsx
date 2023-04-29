import React, { FC } from "react";
import styles from "./blog.module.scss";

const BlogLayout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className={styles.blog_container + " " + styles.blog_listing}>
      {children}
    </div>
  );
};

export default BlogLayout;
