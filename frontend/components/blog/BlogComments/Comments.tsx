"use client";

import React, { FC } from "react";
import AddComment from "./AddComment";
import styles from "./Comments.module.scss";
import { useInfiniteQuery } from "react-query";
import { getPostComments } from "api/comments";

const PAGE_SIZE = 10;

interface CommentsProps {
  postId: string;
}

const Comments: FC<CommentsProps> = ({ postId }) => {
  const commentsQuery = useInfiniteQuery(
    ["comments", postId],
    async ({ pageParam = 0 }) =>
      getPostComments(postId, PAGE_SIZE, pageParam * PAGE_SIZE),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGE_SIZE) {
          return undefined;
        }
        // return lastPage.length;
        // increment pageParam to get the next page
        return allPages.length;
      },
    }
  );

  return (
    <div className={styles.comments}>
      <h3>Comments</h3>

      <AddComment
        postId={postId}
        onCommentAdded={() => commentsQuery.refetch()}
      />

      {commentsQuery.data &&
        commentsQuery.data.pages
          .flat()
          .map((comment, i) => <div key={i}>{comment.content}</div>)}
    </div>
  );
};

export default Comments;
