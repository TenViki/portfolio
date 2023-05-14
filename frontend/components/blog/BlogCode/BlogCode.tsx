"use client";

import React, { useEffect } from "react";
import higlight from "highlight.js";
import { copyToClipboard } from "utils/clipboard";
import katex from "katex";

const BlogCode = () => {
  useEffect(() => {
    const container = document.getElementById("blog-content");

    if (!container) return;

    const code = container.querySelectorAll("pre code");
    const katexViews = container.querySelectorAll<HTMLElement>("katex-view");

    code.forEach((block) => {
      const copyButton = document.createElement("img");
      copyButton.src = "/icons/copy.svg";
      copyButton.className = "copy-button";
      copyButton.setAttribute("x-type", "copy");

      copyButton.addEventListener("click", () => {
        copyToClipboard(block.textContent || "");

        copyButton.src = "/icons/check.svg";

        setTimeout(() => {
          copyButton.src = "/icons/copy.svg";
        }, 3000);
      });

      block.parentElement?.appendChild(copyButton);

      higlight.highlightBlock(block as HTMLElement);
    });

    katexViews.forEach((katexView) => {
      katexView.setAttribute("x-content", katexView.textContent || "");
      katex.render(katexView.textContent || "", katexView, {
        throwOnError: false,
      });
    });

    return () => {
      code.forEach((block) => {
        block.parentElement?.removeChild(block.parentElement.lastChild!);
      });

      katexViews.forEach((katexView) => {
        katexView.innerHTML = katexView.getAttribute("x-content") || "";
      });
    };
  }, []);

  return null;
};

export default BlogCode;
