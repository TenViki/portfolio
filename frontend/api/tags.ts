import { Tag } from "types/blog";
import { api } from "./server";

export const getTags = async () => {
  return api.request<Tag[]>({ method: "GET", url: "/blog/tags" });
};

interface createTagArgs {
  name: string;
  color: string;
}

export const createTag = async ({ name, color }: createTagArgs) => {
  return api.request({
    method: "POST",
    url: "/blog/tags",
    body: { name, color },
    useAuth: true,
  });
};

export const deleteTag = async (id: string) => {
  return api.request({
    method: "DELETE",
    url: `/blog/tags/${id}`,
    useAuth: true,
  });
};

export const updateTag = async (id: string, name: string) => {
  return api.request({
    method: "PATCH",
    url: `/blog/tags/${id}`,
    body: { name },
    useAuth: true,
  });
};
