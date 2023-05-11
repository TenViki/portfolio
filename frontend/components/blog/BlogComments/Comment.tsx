"use client";

import React, { FC, useEffect } from "react";
import { Comment } from "types/blog";
import styles from "./Comment.module.scss";
import { getFileUrl } from "utils/files";
import {
  FiArrowUpRight,
  FiChevronRight,
  FiCornerDownRight,
  FiX,
} from "react-icons/fi";
import RespondButton from "./RespondButton/RespondButton";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addComment, getCommentReplies } from "api/comments";
import { useUser } from "utils/useUser";

interface CommentProps {
  comment: Comment;
  postId: string;
  nestage: number;
  parentCommentId?: string;
}

const Comment: FC<CommentProps> = ({
  comment,
  postId,
  nestage,
  parentCommentId,
}) => {
  const [isResponding, setIsResponding] = React.useState(false);
  const [reply, setReply] = React.useState("");
  const [showReplies, setShowReplies] = React.useState(false);
  const user = useUser();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const replyMutation = useMutation(addComment);

  const replies = useQuery(["replies", comment.id], () =>
    getCommentReplies(postId, comment.id)
  );

  const handleSend = async () => {
    await replyMutation.mutateAsync({
      content: reply,
      parentCommentId: comment.id,
      postId: postId,
    });

    queryClient.invalidateQueries(["comments", postId]);
    queryClient.invalidateQueries(["replies", parentCommentId]);

    setReply("");
    setIsResponding(false);
  };

  useEffect(() => {
    if (isResponding) {
      inputRef.current?.focus();
    }
  }, [inputRef, isResponding]);

  return (
    <div className={styles.comment}>
      <div
        className={styles.comment_card + " " + (isResponding && styles.active)}
      >
        <div className={styles.comment_content}>
          <div className={styles.author}>
            <img src={comment.user.picture} alt="" />
            <span className={styles.name}>{comment.user.name}</span>

            <span className={styles.date}>
              {new Date(comment.createdAt).toLocaleDateString("cs-CZ")}
            </span>
          </div>
          <div className={styles.content}>
            {comment.content.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={styles.reply}>
          {nestage < 3 && (
            <button
              className={styles.respond}
              onClick={() => setIsResponding(!isResponding)}
            >
              <FiCornerDownRight />
            </button>
          )}
        </div>
      </div>

      <form
        className={styles.reply_form + " " + (isResponding && styles.active)}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <AnimatePresence mode="wait">
          {isResponding && (
            <>
              <motion.input
                exit={{ y: "-3.25rem" }}
                animate={{ y: 0 }}
                initial={{ y: "-3.25rem" }}
                transition={{ duration: 0.2 }}
                placeholder="Type your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                ref={inputRef}
              />

              <motion.div
                exit={{ y: "-3.25rem" }}
                animate={{ y: 0 }}
                initial={{ y: "-3.25rem" }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                <button
                  className={styles.cancel}
                  onClick={() => {
                    setIsResponding(false);
                    setReply("");
                  }}
                  type="button"
                >
                  <FiX />
                </button>
              </motion.div>

              <motion.div
                exit={{ y: "-3.25rem" }}
                animate={{ y: 0 }}
                initial={{ y: "-3.25rem" }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <button className={styles.submit}>
                  <FiArrowUpRight />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </form>

      {!!comment.responses && (
        <button
          className={
            styles.responses_count + " " + (showReplies && styles.active)
          }
          onClick={() => setShowReplies(!showReplies)}
        >
          <FiChevronRight />
          {showReplies ? "Hide" : "Show"} {comment.responses} response
          {comment.responses > 1 && "s"}
        </button>
      )}

      <div className={styles.replies}>
        <AnimatePresence>
          {showReplies && (
            <motion.div
              className={styles.reply_card}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {replies.data?.map((reply) => (
                <Comment
                  comment={reply}
                  postId={postId}
                  nestage={nestage + 1}
                  parentCommentId={comment.id}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Comment;
