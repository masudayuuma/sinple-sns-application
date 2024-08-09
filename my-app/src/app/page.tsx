'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      router.push('/posts');
    } else {
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [isLoading, router]);

  if (isLoading) {
    return null; 
  }

  return <div>loading...</div>;
}
