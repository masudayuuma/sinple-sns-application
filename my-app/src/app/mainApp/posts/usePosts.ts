"use client";

import { useEffect, useState } from "react";
import { deletePost, getPosts } from "@/lib/api";
import useFlashMessage from "@/lib/hooks/useFlashMessage";
import { Post } from "@/lib/types";

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { showFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data);
      } else {
        showFlashMessage(response.error, "error");
      }
    };
    fetchPosts();
  }, []);

  const deletePostById = async (postId: string) => {
    const response = await deletePost(postId);
    if (response.success) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      showFlashMessage("投稿を削除しました", "success");
    } else {
      showFlashMessage(response.error, "error");
    }
  };

  return { posts, deletePostById };
}
