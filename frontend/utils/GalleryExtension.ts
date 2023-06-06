import { Node } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    gallery: {
      /**
       * Add an image
       */
      setGallery: (
        options: { src: string; alt?: string; title?: string }[]
      ) => ReturnType;
    };
  }
}

export const GalleryExtension = Node.create({
  name: "gallery",
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: [],
      },
      alt: {
        default: [],
      },
      title: {
        default: [],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "gallery-view",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // loop through the images and create a gallery

    const galleryImages = [];

    for (let i = 0; i < HTMLAttributes.src.length; i++) {
      galleryImages.push([
        "img",
        {
          src: HTMLAttributes.src[i],
          alt: HTMLAttributes.alt[i],
          title: HTMLAttributes.title[i],
        },
      ]);
    }

    return ["gallery-view", ...galleryImages];
  },

  addCommands() {
    return {
      setGallery:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.map((option) => option.src),
              alt: options.map((option) => option.alt),
              title: options.map((option) => option.title),
            },
          });
        },
    };
  },
});
