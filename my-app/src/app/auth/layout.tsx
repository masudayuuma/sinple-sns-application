"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useAuthRedirect from "@/lib/hooks/useAuthRedirect";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isLoading: isAuthLoading } = useAuthRedirect();

  if (isAuthLoading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 rounded-md flex flex-col items-center justify-center">
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
  );
};

export default AuthLayout;
