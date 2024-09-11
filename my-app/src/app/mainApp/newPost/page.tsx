"use client";

import React, { useState } from "react";
import useFlashMessage from "@/lib/hooks/useFlashMessage";
import FlashMessage from "@/lib/components/flashMessage";
import InputContent from "@/app/mainApp/newPost/inputContent";
import useMakeNewPost from "@/app/mainApp/newPost/useMakeNewPost";
import MainLayout from "../layout";
import { contentMaxLenght } from "@/lib/config";

const NewPostPage = () => {
  const [content, setContent] = useState("");
  const { flashMessage, type, isVisible, showFlashMessage } = useFlashMessage();
  const [isLoadingNewPost, setIsLoadingNewPost] = useState(false);
  const { makeNewPost } = useMakeNewPost(showFlashMessage);

  const calculateContentLength = (text: string) =>
    text.replace(/\n/g, "").length;

  const isContentValid: boolean =
    calculateContentLength(content) > 0 &&
    calculateContentLength(content) <= contentMaxLenght;

  const handleSubmit = async (e: React.FormEvent) => {
    if (!content) return;
    e.preventDefault();
    setIsLoadingNewPost(true);
    await makeNewPost(content);
    setContent("");
    setIsLoadingNewPost(false);
  };

  return (
    <MainLayout title="新規登録">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-sm mx-auto"
      >
        <InputContent
          content={content}
          onContentChange={(e) => setContent(e.target.value)}
          calculateContentLength={calculateContentLength}
        />
        <button
          type="submit"
          disabled={!isContentValid || isLoadingNewPost}
          className={`mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoadingNewPost || !isContentValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
          }`}
        >
          {isLoadingNewPost ? "処理中..." : "投稿"}
        </button>
      </form>
      <FlashMessage message={flashMessage} type={type} visible={isVisible} />
    </MainLayout>
  );
};

export default NewPostPage;
