"use client";

import React, { CSSProperties } from "react";
import styles from "./AddComment.module.scss";
import { useUser } from "utils/useUser";

const AddComment = () => {
  const [text, setText] = React.useState("");
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { user } = useUser();

  console.log(user);

  if (!user) {
    return (
      <div className={styles.not_logged_in}>
        You must be logged in to comment
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      style={
        {
          "--button-width": buttonRef.current?.offsetWidth + "px",
        } as CSSProperties
      }
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a public comment"
        className={!!text ? styles.filled : ""}
      />

      <button type="submit" ref={buttonRef}>
        Add
      </button>
    </form>
  );
};

export default AddComment;
