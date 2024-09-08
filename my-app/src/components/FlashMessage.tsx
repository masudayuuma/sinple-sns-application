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

  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-700" : "text-red-700";

  return (
    <div
      className={`fixed bottom-16 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm rounded-lg ${bgColor} ${textColor} shadow-lg`}
      style={{ zIndex: 1000, width: "80vw" }}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
