import React from "react";

interface LogoutButtonProps {
  onLogout: () => void;
  isEditing: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, isEditing }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onLogout}
        disabled={isEditing}
        className="my-8 px-6 py-2 w-3/5 bg-red-500 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        ログアウト
      </button>
    </div>
  );
};

export default LogoutButton;
