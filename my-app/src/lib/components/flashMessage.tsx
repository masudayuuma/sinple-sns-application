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
  const textColor = type === "success" ? "text-white" : "text-white";

  return (
    <div
      className={`fixed bottom-20 left-0 right-0 mx-auto p-4 text-sm rounded-lg shadow-lg text-center  ${bgColor} ${textColor}`}
      style={{
        zIndex: 9999,
        width: "80vw",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
