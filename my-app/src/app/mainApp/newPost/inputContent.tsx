import { contentMaxLenght } from "@/lib/config";
import React from "react";

interface InputContentProps {
  content: string;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  calculateContentLength: (content: string) => number;
}

const InputContent: React.FC<InputContentProps> = ({
  content,
  onContentChange,
  calculateContentLength,
}) => {
  return (
    <>
      <textarea
        value={content}
        onChange={onContentChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={`${contentMaxLenght}文字までの投稿を入力してください`}
        rows={6}
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {calculateContentLength(content)}/{contentMaxLenght}
        </div>
        {calculateContentLength(content) > contentMaxLenght && (
          <div className="text-red-600 mr-4 text-sm">
            {contentMaxLenght}文字以内で入力してください
          </div>
        )}
      </div>
    </>
  );
};

export default InputContent;
