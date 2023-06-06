"use client";

import { getBlogPosts } from "api/blog";
import React, { FC } from "react";
import { useInfiniteQuery } from "react-query";
import { PAGE_SIZE } from "./BlogList";
import BlogPostList from "./BlogPostList";
import { Loader } from "@mantine/core";
import BlogListLoading from "./BlogListLoading";

interface BlogListInfiniteScrollProps {
  tag?: string;
  fetchedPosts: number;
}

const BlogListInfiniteScroll: FC<BlogListInfiniteScrollProps> = ({
  fetchedPosts,
  tag,
}) => {
  const getPostsQuery = useInfiniteQuery(
    ["posts", tag],
    async ({ pageParam = fetchedPosts }) =>
      getBlogPosts({ tag, limit: PAGE_SIZE, offset: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < PAGE_SIZE) {
          return undefined;
        }

        return pages.flat().length + fetchedPosts;
      },
    }
  );

  return (
    <>
      {getPostsQuery.data?.pages.map((page) =>
        page.map((post) => <BlogPostList post={post} key={post.id} />)
      )}

      {getPostsQuery.hasNextPage && (
        <BlogListLoading onIntersect={getPostsQuery.fetchNextPage} />
      )}
    </>
  );
};

export default BlogListInfiniteScroll;
