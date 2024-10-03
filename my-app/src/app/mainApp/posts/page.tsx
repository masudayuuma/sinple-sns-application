"use client";

import React from "react";
import Link from "next/link";
import MainLayout from "../layout";
import PostList from "@/app/mainApp/posts/PostList";

const PostsPage = () => {
  return (
    <MainLayout title="投稿一覧">
      <PostList />

      <Link
        href="/mainApp/newPost"
        className="fixed bottom-20 right-8 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700"
      >
        ＋
      </Link>
    </MainLayout>
  );
};

export default PostsPage;
