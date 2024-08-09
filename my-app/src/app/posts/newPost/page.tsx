'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/utils/api';
import { useRecoilValue } from 'recoil';
import { tokenState } from '@/recoil/atoms';
import Layout from '@/components/Layout';

const NewPostPage = () => {
  const [content, setContent] = useState('');
  const [isLoadingNewPost, setIsLoadingNewPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useRecoilValue(tokenState);
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/auth/login');
    else setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return null;
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

  const calculateContentLength = (text: string) => text.replace(/\n/g, '').length;

  const isContentValid = calculateContentLength(content) > 0 && calculateContentLength(content) <= 140;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!token) return;
    if (isContentValid && !isLoadingNewPost) {
      console.log('投稿しました');
      setIsLoadingNewPost(true);
      try {
        await createPost(token, content);
        router.push('/posts');
      } catch (err) {
        setError('投稿に失敗しました');
        setIsLoadingNewPost(false);
      }
    }
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">新規投稿</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="140文字までの投稿を入力してください"
            rows={4}
          />
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">{calculateContentLength(content)}/140</div>
            {calculateContentLength(content) > 140 && <div className="text-red-600 mr-4 text-sm">140文字以内で入力してください</div>}
          </div>
          <button
            type="submit"
            disabled={!isContentValid || isLoadingNewPost }
            className={`mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoadingNewPost || !isContentValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700'
            }`}
          >
            {isLoadingNewPost ? '処理中...' : '投稿'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default NewPostPage;
