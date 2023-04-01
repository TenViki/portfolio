import { User } from "./auth";

export interface Tag {
  id: string;
  name: string;
  color: string;
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
}
