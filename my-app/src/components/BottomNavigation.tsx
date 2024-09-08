import React from "react";
import Link from "next/link";
import { FaListAlt, FaPlus, FaUser } from "react-icons/fa";

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around p-4">
        <Link
          href="/mainApp/posts"
          className="flex flex-col items-center text-gray-600 hover:text-gray-900"
        >
          <FaListAlt size={24} />
          <span className="text-sm">投稿一覧</span>
        </Link>
        <Link
          href="/mainApp/newPost"
          className="flex flex-col items-center text-gray-600 hover:text-gray-900"
        >
          <FaPlus size={24} />
          <span className="text-sm">投稿作成</span>
        </Link>
        <Link
          href="/mainApp/profile"
          className="flex flex-col items-center text-gray-600 hover:text-gray-900"
        >
          <FaUser size={24} />
          <span className="text-sm">マイページ</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
