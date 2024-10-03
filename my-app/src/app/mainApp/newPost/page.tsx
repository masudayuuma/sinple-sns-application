"use client";

import React, { useState } from "react";
import InputContent from "@/app/mainApp/newPost/InputContent";
import useMakeNewPost from "@/app/mainApp/newPost/useMakeNewPost";
import MainLayout from "../layout";
import { CONTENT_MAX_LENGTH } from "@/lib/config";
import { calculateContentLength } from "@/lib/utils";
import AsyncButton from "@/lib/components/AsyncButton";

const NewPostPage = () => {
  const [content, setContent] = useState("");
  const { makeNewPost } = useMakeNewPost();

  const isContentValid: boolean =
    calculateContentLength(content) > 0 &&
    calculateContentLength(content) <= CONTENT_MAX_LENGTH;

  return (
    <MainLayout title="新規登録">
      <form className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-sm mx-auto">
        <InputContent
          content={content}
          onContentChange={(e) => setContent(e.target.value)}
        />
        <AsyncButton
          type="submit"
          onClick={() => makeNewPost(content)}
          disabled={!isContentValid}
          loadingText="処理中"
          baseClassName="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
          activeClassName="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
          disabledClassName="bg-gray-400 cursor-not-allowed"
        >
          投稿
        </AsyncButton>
      </form>
    </MainLayout>
  );
};

export default NewPostPage;
