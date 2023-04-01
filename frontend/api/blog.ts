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
