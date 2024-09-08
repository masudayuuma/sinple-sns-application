import React from "react";

interface InputContentProps {
  content: string;
  setContent: (content: string) => void;
  calculateContentLength: (content: string) => number;
}

const InputContent: React.FC<InputContentProps> = ({
  content,
  setContent,
  calculateContentLength,
}) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="140文字までの投稿を入力してください"
        rows={4}
      />
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {calculateContentLength(content)}/140
        </div>
        {calculateContentLength(content) > 140 && (
          <div className="text-red-600 mr-4 text-sm">
            140文字以内で入力してください
          </div>
        )}
      </div>
    </>
  );
};

export default InputContent;
