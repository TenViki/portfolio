export const getFileUrl = (id: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${id}/data`;
};

export const isImageValid = (file: File): Promise<Boolean> => {
  return new Promise((resolve) => {
    let _URL = window.URL || window.webkitURL;
    let img = new Image();
    img.src = _URL.createObjectURL(file);

    img.onload = function () {
      resolve(true);
    };

    img.onerror = function () {
      resolve(false);
    };
  });
};
