type TiptapNode = { type: string; content?: TiptapNode[]; text?: string };

export const getDescription = (content: TiptapNode): string => {
  const nodes = content.content;

  if (!nodes) return null;

  const paragraph = nodes.find((node) => node.type === "paragraph");

  if (!paragraph) return null;
  const text = paragraph.content.map((node) => node.text).join("");

  if (text.length > 200) {
    return text.slice(0, 200) + "...";
  }

  return text;
};
