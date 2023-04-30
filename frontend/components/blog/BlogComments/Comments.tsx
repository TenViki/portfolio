import React, { FC } from "react";
import AddComment from "./AddComment";
import styles from "./Comments.module.scss";

interface CommentsProps {
  postId: string;
}

const Comments: FC<CommentsProps> = ({ postId }) => {
  return (
    <div className={styles.comments}>
      <h3>Comments</h3>

      <AddComment postId={postId} />
    </div>
  );
};

export default Comments;
