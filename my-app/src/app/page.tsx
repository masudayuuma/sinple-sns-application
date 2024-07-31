'use client';

import React from "react";
import useAuth from "@/hooks/useAuth";
import Layout from "@/components/Layout";

export default function Home() {

  useAuth();
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Layout>
      <h1 className="text-3xl font-bold">ようこそ</h1>
      <p className="text-xl">Xのようなスマホアプリ</p>
      </Layout>
    </main>
  );
}
