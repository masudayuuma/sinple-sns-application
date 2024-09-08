"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms";
import Link from "next/link";
import useFlashMessage from "@/hooks/useFlashMessage";
import FlashMessage from "@/components/FlashMessage";
import usePosts from "@/hooks/usePosts";
import PostItem from "@/app/mainApp/posts/postItem";
import MainLayout from "../layout";

const PostsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userInfo = useRecoilValue(userState);
  const [isDeleting, setIsDeleting] = useState(false);
  const { flashMessage, type, isVisible, showFlashMessage } = useFlashMessage();
  const { posts, deletePostById } = usePosts(showFlashMessage);
  console.log("posts");

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      showFlashMessage("投稿に成功しました", "success");
      router.replace("/mainApp/posts");
    }
  }, []);

  const handleDelete = async (postId: string) => {
    if (!confirm("本当に削除しますか？")) return;
    setIsDeleting(true);
    await deletePostById(postId);
    setIsDeleting(false);
  };

  return (
    <MainLayout title="投稿一覧">
      <div className="grid gap-4 px-4">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            userInfo={userInfo}
            isDeleting={isDeleting}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <Link
        href="/mainApp/newPost"
        className="fixed bottom-20 right-8 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700"
      >
        ＋
      </Link>
      <div className="text-center">これ以上投稿はありません</div>
      <FlashMessage message={flashMessage} type={type} visible={isVisible} />
    </MainLayout>
  );
};

export default PostsPage;
