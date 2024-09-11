"use client";

import ButtomNavigation from "@/lib/components/buttomNavigation";
import useAuthRedirect from "@/lib/hooks/useAuthRedirect";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const MainLayout: React.FC<LayoutProps> = ({ children, title }) => {
  const { isLoading: isAuthLoading } = useAuthRedirect();
  if (isAuthLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>
      <hr className="border-gray-300 mb-6" />
      <div className="flex-grow container mx-auto ">{children}</div>
      <div className="fixed bottom-0 w-full">
        <ButtomNavigation />
      </div>
    </div>
  );
};

export default MainLayout;
