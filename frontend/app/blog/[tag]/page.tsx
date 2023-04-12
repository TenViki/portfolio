import BlogHeader from "components/blog/BlogHeader/BlogHeader";
import BlogPostList from "components/blog/BlogPostList/BlogPostList";
import BlogTags from "components/blog/BlogTag/BlogTags";
import { BlogPost, Tag as TagType } from "types/blog";
import styles from "../blog.module.scss";

interface BlogTagPageProps {
  params: {
    tag: string;
  };
}

const getPosts = async (tagSlug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?tag=${tagSlug}`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  const data = (await response.json()) as BlogPost[];
  return data;
};

const getTags = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/tags`,
    {
      cache: "no-cache",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch post data");
  }

  const data = (await response.json()) as TagType[];
  return data;
};

const BlogTagPage = async ({ params }: BlogTagPageProps) => {
  const [posts, tags] = await Promise.all([getPosts(params.tag), getTags()]);

  return (
    <div>
      <BlogHeader linkBackHref="/" linkBackText="Home" />
      <h1 className={styles.title}>Blog posts</h1>
      <BlogTags tags={tags} activeTag={params.tag} opened={true} />

      <div className={styles.posts}>
        {posts.map((post) => (
          <BlogPostList post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogTagPage;
