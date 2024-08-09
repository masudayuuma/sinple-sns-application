'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, tokenState } from '../../recoil/atoms';
import useAuth from '../../hooks/useAuth';
import { uploadIconImage } from '../../utils/api';
import Layout from '@/components/Layout';
import { useRouter, useSearchParams } from 'next/navigation';

const MyPage = () => {
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const token = useRecoilValue(tokenState);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if(!token) router.push('/auth/login');
    else setIsLoading(false);

    if (error){
      setTimeout(() => {
        setError(null);
      })
    }
  },[searchParams, token, error]);

  if (isLoading) {
    return null;
  }
  
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !token) return;
    console.log('uploading...');
    setUploading(true);

    try {
      const response = await uploadIconImage(token, file);
      if(response.success && response.userData){
        setUserInfo(response.userData);
      }
    }catch (error) {
      console.error('アイコン画像のアップロードに失敗しました:', error);
      setError('アイコン画像のアップロードに失敗しました');
    }finally{
      setTimeout(() => {
        setUploading(false);
        setFile(null);
      }, 2000);
    };
  };

  const defaultIconImageUrl = `https://robohash.org/${userInfo.name}`; // デフォルト画像のURL

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">My Page</h1>
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
        <img 
          src={userInfo.iconImageUrl || defaultIconImageUrl} 
          alt="User Icon" 
          className="rounded-full w-24 h-24 border-2 border-black"
        />

        <div className="mt-4">
        <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className={`mt-2 px-4 py-2 text-white rounded-md ${
             uploading|| !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            >
            {uploading ? 'Uploading...' : 'Upload Icon'}
          </button>

          {
            error && (
              <div className="p-4 mt-2 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )
          }
        </div>

        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default MyPage;
