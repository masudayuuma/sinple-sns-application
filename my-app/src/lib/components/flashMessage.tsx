import React from "react";
import { useRecoilValue } from "recoil";
import { FlashMessageState } from "../recoil/atoms";

const FlashMessage: React.FC = () => {
  const { message, type, isVisible } = useRecoilValue(FlashMessageState);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const textColor = "text-white";

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 p-4 text-sm rounded-lg shadow-lg text-center ${bgColor} ${textColor}`}
      style={{
        zIndex: 9999,
        width: "90vw",
        maxWidth: "400px",
        boxSizing: "border-box",
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
