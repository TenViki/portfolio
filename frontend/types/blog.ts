import { User } from "./auth";

export interface Tag {
  id: string;
  name: string;
  color: string;
  slug: string;
}

export interface FileType {
  id: string;
  filename: string;
  size: number;
  mimetype: string;
  path: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  tags: Tag[];
  banner: FileType | null;
  author: User;
  createdAt: string;
  updatedAt: string;
  views: number;
  publicReactions: Reactions;
  comments: number;
}

export interface Reactions {
  heart: number;
  fire: number;
  mindBlown: number;
  rocket: number;
  thumbsDown: number;
}

export interface SelfReactions {
  heart: boolean;
  fire: boolean;
  mindBlown: boolean;
  rocket: boolean;
  thumbsDown: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  post: BlogPost;
  responseTo: Comment | null;
  responses: number;
}
