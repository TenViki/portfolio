"use client";

import React, { FC } from "react";
import { BlogPost, Reactions, SelfReactions } from "types/blog";
import styles from "./BlogReactions.module.scss";
import Reaction from "./Reaction";
import { useQuery } from "react-query";
import {
  addReaction,
  getUserReactionsForComment,
  getUserReactionsForPost,
} from "api/reactions";
import { useUser } from "utils/useUser";

interface BlogReactionsProps {
  reactions: Reactions;
  postId?: string;
  commentId?: string;
}

const BlogReactions: FC<BlogReactionsProps> = ({
  reactions,
  postId,
  commentId,
}) => {
  const [selfReactions, setSelfReactions] = React.useState<SelfReactions>({
    fire: false,
    heart: false,
    mindBlown: false,
    rocket: false,
    thumbsDown: false,
  });

  const { user } = useUser();

  useQuery(
    ["self-reactions", postId, commentId],
    () =>
      postId
        ? getUserReactionsForPost(postId)
        : getUserReactionsForComment(commentId!),
    {
      onSuccess: (data) => {
        if (!data) return;
        setSelfReactions(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div
      className={styles.reactions + " " + (!user && styles.not_logged_in)}
      {...{ id: postId ? "blog-reactions" : undefined }}
    >
      {Object.keys(reactions).map((reaction, i) => (
        <Reaction
          key={i}
          type={reaction}
          count={reactions[reaction as keyof Reactions]}
          active={selfReactions[reaction as keyof SelfReactions]}
          onClick={() => {
            const newSelfReactions = {
              ...selfReactions,
              [reaction]: !selfReactions[reaction as keyof SelfReactions],
            };

            setSelfReactions(newSelfReactions);
            addReaction({ reaction: newSelfReactions, postId, commentId });
          }}
        />
      ))}
    </div>
  );
};

export default BlogReactions;
