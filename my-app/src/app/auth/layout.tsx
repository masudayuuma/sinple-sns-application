'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

interface AuthLayoutProps {
  children: ReactNode;  // childrenの型をReactNodeとして明示
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();  // useRouter フックを使用して router を定義

  return (
    <RecoilRoot>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Auth Page</h1>
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => router.push('/auth/login')}  // router を使用
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/auth/register')}  // router を使用
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
          >
            Register
          </button>
        </div>
        <div className="w-full flex justify-center">
          {children}
        </div>
      </div>
    </RecoilRoot>
  );
};

export default AuthLayout;
