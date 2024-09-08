"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function Home() {
  const { isLoading } = useAuthRedirect();
  if (isLoading) {
    return <div>Loading...</div>;
  }
}
