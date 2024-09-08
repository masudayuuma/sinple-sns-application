"use client";

import { useEffect, useState } from "react";
import { deletePost, getPosts } from "@/utils/api";
import { tokenState, User } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

export interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: string;
  user: User;
}

export default function usePosts(
  showFlashMessage: (message: string, type: "success" | "error") => void
) {
  const [posts, setPosts] = useState<Post[]>([]);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchPosts = async (token: string) => {
      const { success, userData, error } = await getPosts(token);
      if (success && userData) {
        setPosts(userData);
      } else if (!success && error) {
        showFlashMessage(error, "error");
      } else {
        showFlashMessage("予期しないエラーが発生しました", "error");
      }
    };
    if (token) {
      fetchPosts(token);
    }
  }, [token]);

  const deletePostById = async (postId: string) => {
    if (!token) {
      showFlashMessage(
        "トークンが存在しません。再度ログインしてください",
        "error"
      );
      return;
    }
    const { success, userData, error } = await deletePost(token, postId);
    if (success && userData === null) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      showFlashMessage("投稿を削除しました", "success");
    } else if (!success && error) {
      showFlashMessage(error, "error");
    } else {
      showFlashMessage("予期しないエラーが発生しました", "error");
    }
  };

  return { posts, deletePostById };
}
