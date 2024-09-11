"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import "./globals.css";

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
