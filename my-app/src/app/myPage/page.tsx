'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import useAuth from '../../hooks/useAuth';

const MyPage = () => {
  const { logout } = useAuth();
  const userInfo = useRecoilValue(userState);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">My Page</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      {userInfo.iconImageUrl && <img src={userInfo.iconImageUrl} alt="User Icon" />}
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default MyPage;
