import { SelfReactions } from "types/blog";
import { api } from "./server";

export const getUserReactionsForPost = async (postId: string) => {
  return await api.request<SelfReactions>({
    method: "GET",
    url: `/blog/${postId}/my-reaction`,
    useAuth: true,
  });
};

export const getUserReactionsForComment = async (commentId: string) => {
  return await api.request<SelfReactions>({
    method: "GET",
    url: `/blog/${commentId}/my-reaction`,
    useAuth: true,
  });
};

export const addReaction = async ({
  reaction,
  postId,
  commentId,
}: {
  reaction: SelfReactions;
  postId?: string;
  commentId?: string;
}) => {
  return await api.request<SelfReactions>({
    method: "POST",
    url: `/blog/react`,
    useAuth: true,
    body: {
      ...reaction,
      postId,
      commentId,
    },
  });
};
