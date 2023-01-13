import { filterXSS, IFilterXSSOptions } from "xss";

export const DEFAULT_XSS_OPTIONS: IFilterXSSOptions = {
  whiteList: {
    a: ["style", "title", "href", "target"],
    span: ["style"],
    b: ["style"],
    code: ["style"],
    div: ["style"],
    em: ["style"],
    h1: ["style"],
    h2: ["style"],
    h3: ["style"],
    h4: ["style"],
    h5: ["style"],
    h6: ["style"],
    hr: ["style"],
    img: ["src"],
    li: ["key", "style"],
    ol: ["style"],
    ul: ["style"],
    p: ["style"],
    pre: ["style"],
    strong: ["style"],
    svg: ["src"],
    tr: ["key", "style"],
    u: ["style"],
    video: ["src"],
  },
};

export const filterXss = (html: string, options?: IFilterXSSOptions) => {
  return filterXSS(html, {
    ...DEFAULT_XSS_OPTIONS,
    ...options,
  });
};
