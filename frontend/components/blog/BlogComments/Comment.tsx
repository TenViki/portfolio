import React, { FC } from "react";
import { Comment } from "types/blog";
import styles from "./Comment.module.scss";
import { getFileUrl } from "utils/files";

interface CommentProps {
  comment: Comment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.author}>
        <img src={comment.user.picture} alt="" />
        {comment.user.name}{" "}
        <span className={styles.date}>
          &bull; {new Date(comment.createdAt).toLocaleDateString("cs-CZ")}
        </span>
      </div>

      <div className={styles.content}>{comment.content}</div>

      {comment.responses > 0 && (
        <div className={styles.replies}>
          <div className={styles.reply_header}>
            Show {comment.responses} replies
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
