import React, { CSSProperties, FC } from "react";
import styles from "./BlogReactions.module.scss";

interface ReactionProps {
  type: string;
  count: number;
  active: boolean;
  onClick?: () => void;
}

const emojiList: { [key: string]: string } = {
  fire: "🔥",
  heart: "❤️",
  mindBlown: "💀",
  rocket: "🚀",
  thumbsDown: "👎",
};

const Reaction: FC<ReactionProps> = ({ active, count, type, onClick }) => {
  const [numberOffset, setNumberOffset] = React.useState(1);

  return (
    <div
      onClick={() => {
        setNumberOffset((p) => (active ? p - 1 : p + 1));
        onClick && onClick();
      }}
      className={styles.reaction + " " + (active && styles.active)}
      style={
        {
          "--number-offset": numberOffset,
        } as CSSProperties
      }
    >
      <div className={styles.emoji}>{emojiList[type]}</div>
      <div className={styles.count}>
        <div className={styles.count_below}>{count - 1}</div>
        <div className={styles.count_now}>{count}</div>

        <div className={styles.count_above}>{count + 1}</div>
      </div>
    </div>
  );
};

export default Reaction;
