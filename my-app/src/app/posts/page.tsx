'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '../../recoil/atoms';
import { getPosts, deletePost } from '../../utils/api';
import { Post } from '../../utils/api';
import Layout from '../../components/Layout';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PostsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const token = useRecoilValue(tokenState);
  const userInfo = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useAuth();

  useEffect(() => {
    if (token) {
      setIsLoading(false);
    }

    if (searchParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        router.replace('/posts');
      }, 2000);
    }

    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
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
  }, [searchParams, token, error]);

  if (isLoading) {
    return null;
  }

     const handleDelete = async (postId: string) => {
        if(!token) return;
        console.log('削除しました');
        setIsDeleting(true);

        const isConfirmed = confirm('本当に削除しますか？');
          if (!isConfirmed) {
            setIsDeleting(false);
        return;}

        try {
          const response = await deletePost(token, postId);
          setPosts(posts.filter(post => post.id !== postId));
        }catch(err) {
          setError("投稿の削除に失敗しました");
        }finally {
          setIsDeleting(false);
        }
    }

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

  const formatPostContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 mb-8">
        <h1 className="text-3xl font-bold">投稿一覧</h1>
        {showSuccessMessage && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
            投稿が成功しました！
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        <div className="grid gap-4">
          {posts.map(post => (
            <div key={post.id} className="p-4 bg-white rounded shadow overflow-hidden break-words">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center mb-2">
                  <img src={post.user.iconImageUrl || `https://robohash.org/${post.user.name}`} alt="User Icon" className="w-10 h-10 rounded-full mr-2" />
                  <div>
                    <p className="font-bold">{post.user.name}</p>
                    <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                  </div>
                </div>
                {userInfo && userInfo.id === post.user.id && (
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={isDeleting}
                  className={`text-red-500 rounded hover:text-red-700 ${
                  isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-red-100'
                  }`}
                >
                <FontAwesomeIcon icon={faTrash} /> 削除
                </button>
                )}

              </div>
              <p>{formatPostContent(post.body)}</p>
            </div>
          ))}
        </div>
        <Link
          href="/posts/newPost"
          className="fixed bottom-20 right-8 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700"
        >
          ＋
        </Link>
      </div>
      <div className='text-center'>これ以上投稿はありません</div>
    </Layout>
  );
};

export default PostsPage;
