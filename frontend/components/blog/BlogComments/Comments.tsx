import React from "react";
import AddComment from "./AddComment";
import styles from "./Comments.module.scss";

const Comments = () => {
  return (
    <div className={styles.comments}>
      <h3>Comments</h3>

      <AddComment />
    </div>
  );
};

export default Comments;
