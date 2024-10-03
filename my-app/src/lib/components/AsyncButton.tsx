import React, { useState, useRef } from "react";

interface AsyncButtonProps {
  onClick: () => Promise<void>;
  disabled?: boolean;
  children: React.ReactNode;
  baseClassName: string;
  disabledClassName: string;
  activeClassName: string;
  loadingText: string;
  type?: "button" | "submit" | "reset";
}

const AsyncButton: React.FC<AsyncButtonProps> = ({
  onClick,
  disabled = false,
  children,
  baseClassName = "",
  disabledClassName = "",
  activeClassName = "",
  loadingText = "",
  type = "button",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isProcessingRef = useRef(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isProcessingRef.current || disabled) return;
    isProcessingRef.current = true;
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 2000);
    }
  };

  const combinedClassName = `${baseClassName} ${
    disabled || isLoading ? disabledClassName : activeClassName
  }`;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isProcessingRef.current}
      className={combinedClassName}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default AsyncButton;
