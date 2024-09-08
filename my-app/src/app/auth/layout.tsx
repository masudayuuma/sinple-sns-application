"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import Link from "next/link";
import { RecoilRoot } from "recoil";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isLoading } = useAuthRedirect();

  if (isLoading) return <div>Loading...</div>;
  return (
    <RecoilRoot>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full flex flex-col items-center justify-center">
          {children}
          {pathname === "/auth/login" && (
            <Link
              href="/auth/register"
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              新規登録の方はこちらへ
            </Link>
          )}
          {pathname === "/auth/register" && (
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
