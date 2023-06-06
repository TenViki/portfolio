"use client";

import React, { FC, useMemo } from "react";
import { Reactions } from "types/blog";
import { emojiList } from "./Reaction";
import styles from "./ReactionsIndicator.module.scss";
import { formatNumber } from "utils/numbers";

interface ReactionsIndicatorProps {
  reactions: Reactions;
  hoverable?: boolean;
}

const ReactionsIndicator: FC<ReactionsIndicatorProps> = ({
  reactions,
  hoverable,
}) => {
  // three most non zero reactions

  const slicedReactions = useMemo(() => {
    const r = Object.entries(reactions).map(([key, value]) => ({
      name: key,
      value,
    }));

    r.sort((a, b) => b.value - a.value);

    return r.slice(0, 3).filter((r) => r.value > 0);
  }, [reactions]);

  const sum = useMemo(() => {
    return Object.values(reactions).reduce((a, b) => a + b, 0);
  }, [reactions]);

  if (sum === 0) return null;

  return (
    <div
      className={
        styles.reaction_indicator + " " + (hoverable && styles.hoverable)
      }
      onClick={() =>
        document
          .getElementById("blog-reactions")
          ?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    >
      {slicedReactions.map((reaction, i) => (
        <div
          key={reaction.name}
          className={styles.emoji}
          style={{ zIndex: slicedReactions.length - i }}
        >
          {emojiList[reaction.name]}
        </div>
      ))}

      <div className={styles.sum}>{formatNumber(sum)}</div>
    </div>
  );
};

export default ReactionsIndicator;
