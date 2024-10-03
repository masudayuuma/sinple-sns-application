import { CONTENT_MAX_LENGTH } from "@/lib/config";
import React from "react";
import { calculateContentLength } from "@/lib/utils";

interface InputContentProps {
  content: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputContent: React.FC<InputContentProps> = ({
  content,
  onContentChange,
}) => {
  return (
    <>
      <textarea
        value={content}
        onChange={onContentChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={`${CONTENT_MAX_LENGTH}文字までの投稿を入力してください`}
        rows={6}
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {calculateContentLength(content)}/{CONTENT_MAX_LENGTH}
        </div>
        {calculateContentLength(content) > CONTENT_MAX_LENGTH && (
          <div className="text-red-600 mr-4 text-sm">
            {CONTENT_MAX_LENGTH}文字以内で入力してください
          </div>
        )}
      </div>
    </>
  );
};

export default InputContent;
