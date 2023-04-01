export const getFileUrl = (id: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${id}/data`;
};
