"use client";

import React, { CSSProperties, FC } from "react";
import styles from "./AddComment.module.scss";
import { useUser } from "utils/useUser";
import { addComment } from "api/comments";
import { useMutation } from "react-query";

interface AddCommentProps {
  postId: string;
}

const AddComment: FC<AddCommentProps> = ({ postId }) => {
  const [text, setText] = React.useState("");
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { user } = useUser();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      setText("");
    },
  });

  React.useEffect(() => {
    if (!textareaRef.current) return;
    // Reset height - important to shrink on delete
    textareaRef.current.style.height = "inherit";
    // Set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      0
    )}px`;
  }, [text]);

  if (!user) {
    return (
      <div className={styles.not_logged_in}>
        You must be logged in to comment
      </div>
    );
  }

  return (
    <form
      className={styles.form + " " + (!!text.trim() && styles.filled)}
      style={
        {
          "--button-width": buttonRef.current?.offsetWidth + "px",
        } as CSSProperties
      }
      onSubmit={(e) => {
        e.preventDefault();
        addCommentMutation.mutate({
          content: text,
          postId,
        });
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a public comment"
        rows={1}
        ref={textareaRef}
      >
        {text}
      </textarea>

      <button type="submit" ref={buttonRef}>
        Add
      </button>
    </form>
  );
};

export default AddComment;
