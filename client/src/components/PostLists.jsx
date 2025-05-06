import React from "react";
import styles from "../Styles/PostLists.module.css";
import PostListsItem from "./PostListsItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { Dots } from "react-activity";


const PostLists = () => {

  const [searchParams,setSearchParams] = useSearchParams()

    // Fetch posts from the backend
    const fetchPosts = async (pageParam,searchParams) => {
      const searchParamsObj = Object.fromEntries([...searchParams])
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
        params: {
          page: pageParam,
          limit: 10,
          ...searchParamsObj
        },
      });
      return response.data;
    };
  


  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts",searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam,searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
  });

  if (status === "loading") return <p><Dots /></p>;
  if (status === "error") return <p>An error has occurred: {error.message}</p>;

  // Flatten all pages of posts
  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length} 
      next={fetchNextPage}
      hasMore={hasNextPage} 
      loader={<h4><Dots /></h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>All Posts Loaded</b>
        </p>
      }
    >
      {allPosts.map((post,index) => (
        <PostListsItem key={index} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostLists;
