import React from 'react';
import { useRouter } from 'next/navigation';

const BottomNavigation = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
      <div className="flex justify-around p-4">
        <button onClick={() => router.push('/posts')} className="text-gray-600 hover:text-gray-900">
          投稿一覧
        </button>
        <button onClick={() => router.push('/posts/new')} className="text-gray-600 hover:text-gray-900">
          投稿作成
        </button>
        <button onClick={() => router.push('/mypage')} className="text-gray-600 hover:text-gray-900">
          My Page
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
