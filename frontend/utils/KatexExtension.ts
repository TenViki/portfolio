import { Fragment } from "@tiptap/pm/model";
import { Node, mergeAttributes } from "@tiptap/core";
import katex from "katex";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    katexBlock: {
      /**
       * Set a code block
       */
      setKatexBlock: (attributes?: {}) => ReturnType;
      /**
       * Toggle a code block
       */
      toggleKatexBlock: (attributes?: {}) => ReturnType;
    };
  }
}

const nodeContentToText = (content: Fragment) => {
  let text = "";

  content.forEach((node) => {
    if (node.isText) {
      text += node.text;
    } else if (node.isLeaf) {
      text += node.textContent;
    } else {
      text += nodeContentToText(node.content);
    }
  });

  return text;
};

export const KatexExtension = Node.create({
  name: "katexBlock",
  content: "text*",
  group: "block",
  draggable: true,
  code: true,
  marks: "",
  defining: true,

  addOptions: () => {
    return {
      exitOnTripleEnter: true,
    };
  },

  addAttributes() {
    return {
      value: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "katex-view",
      },
    ];
  },

  onDestroy() {
    console.log("KatexExtension onDestroy");
  },

  renderHTML({ HTMLAttributes }) {
    return ["katex-view", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ({
      editor,
      node,
      getPos,
      HTMLAttributes,
      decorations,
      extension,
    }) => {
      const { view } = editor;
      const dom = document.createElement("div");
      dom.classList.add("katex-block");

      const katexRenderWindow = document.createElement("div");
      katexRenderWindow.classList.add("katex-render-window");
      katexRenderWindow.contentEditable = "false";

      dom.appendChild(katexRenderWindow);

      const katexInputWindow = document.createElement("div");
      katexInputWindow.classList.add("katex-input-window");
      katexInputWindow.contentEditable = "true";

      const handleInput = (cnt?: string) => {
        const content = cnt || katexInputWindow.textContent!;

        console.log("Node view handleInput: " + content);

        katex.render(content, katexRenderWindow, {
          throwOnError: false,
        });
      };

      handleInput(node.textContent);
      dom.appendChild(katexInputWindow);

      return {
        dom,
        contentDOM: katexInputWindow,
        update(node) {
          handleInput();

          console.log(node);

          if (node.type.name !== extension.name) {
            // on node type change, destroy the node view

            // @ts-ignore
            this.destroy();

            return false;
          }

          return true;
        },

        destroy() {
          console.log("KatexExtension NodeView destroy");
        },
      };
    };
  },

  addCommands() {
    return {
      setKatexBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
      toggleKatexBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph", attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        if (!this.options.exitOnTripleEnter) {
          return false;
        }

        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");

        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }

        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 2, $from.pos);

            return true;
          })
          .exitCode()
          .run();
      },
    };
  },
});
