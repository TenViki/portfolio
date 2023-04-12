import { generateHTML } from "@tiptap/html";
import BlogGallery from "components/blog/BlogGallery/BlogGallery";
import Link from "next/link";
import { CSSProperties } from "react";
import { BlogPost } from "types/blog";
import { getFileUrl } from "utils/files";
import styles from "./BlogPost.module.scss";

// Tiptap extensions
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { lowlight } from "lowlight";
import BlogCode from "components/blog/BlogCode/BlogCode";

import "highlight.js/styles/atom-one-dark.css";
import Tag from "components/blog/BlogTag/Tag";
import { Metadata } from "next";
import { KatexExtension } from "utils/KatexExtension";

import "../admin/blog/katex.scss";
import { GalleryExtension } from "utils/GalleryExtension";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const fetchPostData = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${slug}`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  const data = (await response.json()) as BlogPost;
  return data;
};

const BlogPost = async ({ params }: BlogPostProps) => {
  const data = await fetchPostData(params.slug);

  const output = generateHTML(JSON.parse(data.content), [
    StarterKit,
    Underline,
    LinkExtension,
    Superscript,
    Subscript,
    Highlight,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    ImageExtension,
    KatexExtension,
    CodeBlockLowlight.configure({
      lowlight,
    }).extend({
      name: "codeBlock-lowlight",
      renderHTML({ HTMLAttributes }) {
        // render html w  c    ith highlight.js

        return ["pre", ["code", HTMLAttributes, 0]];
      },
    }),
    GalleryExtension,
  ]);

  return (
    <>
      <div
        className={
          styles.header + " " + (data.banner ? styles.with_banner : "")
        }
      >
        {data.banner && (
          <>
            <img
              className={styles.banner_img}
              src={getFileUrl(data.banner.id)}
            />
            <div className={styles.overlay} />
          </>
        )}

        <h1>{data.title}</h1>

        <div className={styles.user}>
          <img src={data.author.picture} alt="Userpfp" />
          <span className={styles.username}>{data.author.name}</span>{" "}
          <span className={styles.date}>
            {new Date(data.createdAt).toLocaleDateString("cs")}
          </span>
        </div>
      </div>

      <div className={styles.tags}>
        {data.tags.map((tag) => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </div>

      <div
        className={styles.content}
        id="blog-content"
        dangerouslySetInnerHTML={{
          __html: output,
        }}
      ></div>

      <BlogGallery />
      <BlogCode />
    </>
  );
};

export default BlogPost;
