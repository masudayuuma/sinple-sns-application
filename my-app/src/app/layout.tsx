"use client";

import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import "./globals.css";
import FlashMessage from "@/lib/components/FlashMessage";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <html lang="ja">
        <body>
          {children}
          <FlashMessage />
        </body>
      </html>
    </RecoilRoot>
  );
};

export default RootLayout;
