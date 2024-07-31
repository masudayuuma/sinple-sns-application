'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <html lang="ja">
        <body>{children}</body>
      </html>
    </RecoilRoot>
  );
};

export default RootLayout;
