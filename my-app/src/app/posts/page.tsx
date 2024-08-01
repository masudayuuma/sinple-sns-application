'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '../../recoil/atoms';
import { getPosts, deletePost } from '../../utils/api';
import { Post } from '../../utils/api';
import Layout from '../../components/Layout';
import useAuth  from '../../hooks/useAuth';

const PostsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const token = useRecoilValue(tokenState);
  const userInfo = useRecoilValue(userState);

  useAuth();

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        router.replace('/posts');
      }, 2000);
    }

    if (token) {
      getPosts(token).then(response => {
        if (response.success && response.userData) {
          setPosts(response.userData);
        } else {
          console.error('Failed to fetch posts:', response.error);
        }
      });
    }
  }, [searchParams, token]);

  const handleDelete = async (postId: string) => {
    if (!token) return;

    const response = await deletePost(token, postId);
    if (response.success) {
      setPosts(posts.filter(post => post.id !== postId));
    } else {
      console.error('Failed to delete post:', response.error);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tokyo'
    };
    return new Date(dateString).toLocaleDateString('ja-JP', options);
  };


  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">投稿一覧</h1>
        {showSuccessMessage && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
            投稿が成功しました！
          </div>
        )}
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 bg-white rounded shadow">
              <div className="flex items-center mb-2">
                <img src={post.user.iconImageUrl || `https://robohash.org/${post.user.name}`} alt="User Icon" className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <p className="font-bold">{post.user.name}</p>
                  <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                </div>
              </div>
              <p>{post.body}</p>
              {post.userId === userInfo?.id && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push('/posts/newPost')}
          className="fixed bottom-20 right-8 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700"
        >
          ＋
        </button>
      </div>
    </Layout>
  );
};

export default PostsPage;
