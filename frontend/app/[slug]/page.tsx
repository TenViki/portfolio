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
import AddComment from "components/blog/BlogComments/AddComment";
import Comments from "components/blog/BlogComments/Comments";
import BlogReactions from "components/blog/BlogReactions/BlogReactions";
import ReactionsIndicator from "components/blog/BlogReactions/ReactionsIndicator";
import { getDescription } from "utils/blog";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

const fetchPostData = async (
  slug: string
): Promise<
  | {
      sucess: true;
      data: BlogPost;
    }
  | {
      sucess: false;
    }
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${slug}`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    console.log("pulling", response.url);

    return {
      sucess: false,
    };
  }

  const data = (await response.json()) as BlogPost;
  return {
    data: data,
    sucess: true,
  };
};

export const generateMetadata = async ({
  params,
}: BlogPostProps): Promise<Metadata> => {
  const page = await fetchPostData(params.slug);

  if (!page.sucess) {
    return {
      title: "404",
      description: "Page not found",
      themeColor: "#f1c40f",
    };
  }

  const data = page.data;

  const description =
    data.content.length > 100
      ? data.content.slice(0, 100) + "..."
      : data.content;

  return {
    title: data.title,
    description,
    themeColor: "#f1c40f",
    openGraph: {
      title: data.title + " | VikiTheDev",
      description: getDescription(JSON.parse(data.content)) || "Check it out!",
      url: "https://vikithedev.eu/" + params.slug,
      images: data.banner
        ? [
            {
              url: getFileUrl(data.banner.id),
              alt: data.title,
            },
          ]
        : undefined,
    },
  };
};

const BlogPost = async ({ params }: BlogPostProps) => {
  const page = await fetchPostData(params.slug);

  if (!page.sucess) {
    return (
      <div className={styles.not_found}>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    );
  }

  const data = page.data;

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

      <div className={styles.post_meta}>
        <div className={styles.tags}>
          {data.tags.map((tag) => (
            <Tag tag={tag} key={tag.id} />
          ))}
        </div>

        <div className={styles.reactions}>
          <ReactionsIndicator
            reactions={data.publicReactions}
            hoverable={true}
          />
        </div>
      </div>

      <div
        className={styles.content}
        id="blog-content"
        dangerouslySetInnerHTML={{
          __html: output,
        }}
      ></div>

      <BlogReactions reactions={data.publicReactions} postId={data.id} />

      <Comments postId={data.id} />

      <BlogGallery />
      <BlogCode />

      <div className={styles.back}>
        Viktor Komárek &copy; {new Date().getFullYear()}
      </div>
    </>
  );
};

export default BlogPost;
