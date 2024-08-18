'use client';

import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;  
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter(); 
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      router.push('/posts');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <RecoilRoot>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full flex flex-col items-center justify-center">
          {children}
          {pathname === '/auth/login' && (
            <Link 
              href="/auth/register" 
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              新規登録の方はこちらへ
            </Link>
          )}
          {pathname === '/auth/register' && (
            <Link
              href="/auth/login"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              ログインの方はこちらへ
            </Link>
          )}
        </div>
      </div>
    </RecoilRoot>
  );
};

export default AuthLayout;
