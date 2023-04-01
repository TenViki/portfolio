import { FileType } from "types/blog";
import { api } from "./server";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.server.post<FileType>("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("token") || "",
    },
  });
};
