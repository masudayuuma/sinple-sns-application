import React, { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto p-4">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
