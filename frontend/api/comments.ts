import { Comment } from "types/blog";
import { api } from "./server";

interface NewComment {
  content: string;
  postId: string;
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
