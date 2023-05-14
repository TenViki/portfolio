import { Comment } from "types/blog";
import { api } from "./server";

interface NewComment {
  content: string;
  postId?: string;
  parentCommentId?: string;
}

export const getPostComments = async (
  postId: string,
  limit: number,
  offset: number
) => {
  return api.request<Comment[]>({
    method: "GET",
    url: `/blog/comments/${postId}?l=${limit}&o=${offset}`,
  });
};

export const addComment = async (data: NewComment) => {
  return api.request({
    method: "POST",
    url: "/blog/comments",
    body: data,
    useAuth: true,
  });
};

export const getCommentReplies = async (postId: string, commentId: string) => {
  return api.request<Comment[]>({
    method: "GET",
    url: `/blog/comments/${postId}/${commentId}`,
  });
};

export const deleteComment = async (commentId: string) => {
  return api.request({
    method: "DELETE",
    url: `/blog/comments/${commentId}`,
    useAuth: true,
  });
};
