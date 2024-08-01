'use client';

import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, tokenState } from '../../recoil/atoms';
import useAuth from '../../hooks/useAuth';
import { uploadIconImage } from '../../utils/api';
import Layout from '@/components/Layout';

const MyPage = () => {
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const token = useRecoilValue(tokenState);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  

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

    setUploading(true);

    const response = await uploadIconImage(token, file);
    if (response.success && response.userData) {
      setUserInfo(response.userData);
      console.log('アイコン画像を更新しました:', response.userData);
    } else {
      console.error('アイコン画像のアップロードに失敗しました:', response.error);
      alert('アイコン画像のアップロードに失敗しました');
    }

    setUploading(false);
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
            disabled={uploading}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            {uploading ? 'Uploading...' : 'Upload Icon'}
          </button>
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
