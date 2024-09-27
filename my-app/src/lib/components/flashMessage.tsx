"use client";

import React from "react";

interface FlashMessageProps {
  message: string;
  type: "success" | "error";
  visible: boolean;
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  message,
  type,
  visible,
}) => {
  if (!visible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";

  return (
    <div
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 p-4 text-sm rounded-lg shadow-lg text-center ${bgColor} ${textColor}`}
      style={{
        zIndex: 9999, // すべての要素より前面に
        width: "90vw", // 幅90%
        maxWidth: "400px", // 最大400pxまで
        boxSizing: "border-box", // ボックスサイズ調整
        position: "fixed", // 固定
        left: "50%", // 横方向中央に配置
        transform: "translateX(-50%)", // 中央揃え
        backgroundColor: bgColor, // 背景色
        color: textColor, // テキストの色
      }}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
