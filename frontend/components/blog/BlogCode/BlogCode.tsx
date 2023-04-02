"use client";

import React, { useEffect } from "react";
import higlight from "highlight.js";
import { copyToClipboard } from "utils/clipboard";

const BlogCode = () => {
  useEffect(() => {
    const container = document.getElementById("blog-content");

    if (!container) return;

    const code = container.querySelectorAll("pre code");

    code.forEach((block) => {
      const copyButton = document.createElement("img");
      copyButton.src = "/icons/copy.svg";
      copyButton.className = "copy-button";
      copyButton.setAttribute("x-type", "copy");

      copyButton.addEventListener("click", () => {
        copyToClipboard(block.textContent || "");
      });

      block.parentElement?.appendChild(copyButton);

      higlight.highlightBlock(block as HTMLElement);
    });

    return () => {
      code.forEach((block) => {
        block.parentElement?.removeChild(block.parentElement.lastChild!);
      });
    };
  }, []);

  return null;
};

export default BlogCode;
