import { BlogPost } from "types/blog";
import { api } from "./server";

interface NewBlogPostArgs {
  title: string;
  content: string;
  tags: string[];
  bannerImageId?: string;
  slug: string;
  published: boolean;
}

export const newBlogPost = async (post: NewBlogPostArgs) => {
  return api.request<BlogPost>({
    method: "POST",
    url: "/blog/",
    body: post,
    useAuth: true,
  });
};

export const getAllBlogPostsAdmin = async () => {
  return api.request<BlogPost[]>({
    method: "GET",
    url: "/blog/all-blog-posts-admin",
    useAuth: true,
  });
};

export const editBlogPost = async (post: NewBlogPostArgs & { id: string }) => {
  return api.request<BlogPost>({
    method: "PATCH",
    url: `/blog/${post.id}`,
    body: post,
    useAuth: true,
  });
};
