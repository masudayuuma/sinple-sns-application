"use client";

import { useEffect, useState } from "react";
import { deletePost, getPosts } from "@/lib/api";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/config";
import useFlashMessage from "@/lib/hooks/useFlashMessage";
import { Post } from "@/lib/types";

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const { showFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchPosts = async (storedToken: string) => {
      const response = await getPosts(storedToken);
      if (response.success) {
        setPosts(response.data);
      } else {
        showFlashMessage(response.error, "error");
      }
    };
    if (storedToken) {
      fetchPosts(storedToken);
    }
  }, [storedToken]);

  const deletePostById = async (postId: string) => {
    if (!storedToken) {
      showFlashMessage(
        "トークンが存在しません。再度ログインしてください",
        "error"
      );
      return;
    }
    const response = await deletePost(storedToken, postId);
    if (response.success) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      showFlashMessage("投稿を削除しました", "success");
    } else {
      showFlashMessage(response.error, "error");
    }
  };

  return { posts, deletePostById };
}
