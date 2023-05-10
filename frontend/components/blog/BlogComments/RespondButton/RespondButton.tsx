"use client";

import React, { CSSProperties, FC } from "react";
import styles from "./RespondButton.module.scss";
import { FiCornerDownRight, FiSend, FiX } from "react-icons/fi";

interface RespondButtonProps {
  onReply: (text: string) => void;
}

const RespondButton: FC<RespondButtonProps> = () => {
  const [isResponding, setIsResponding] = React.useState(false);

  // return (
  //   // <div className={styles.reply_button}>
  //   //   <div className={styles.reply} onClick={() => setIsResponding(true)}>
  //   //     <FiCornerDownRight />
  //   //     Reply
  //   //   </div>
  //   // </div>
  // );

  return null;
};

export default RespondButton;
