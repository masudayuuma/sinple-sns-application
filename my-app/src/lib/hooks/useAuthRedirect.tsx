"use client";

import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRecoilState } from "recoil";
import { userState } from "@/lib/recoil/atoms";
import { usePathname, useRouter } from "next/navigation";

const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo] = useRecoilState(userState);
  const { fetchAndSetUserInfo } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthPage = pathname.startsWith("/auth");

      let currentUserInfo = userInfo;
      if (currentUserInfo === null) {
        currentUserInfo = await fetchAndSetUserInfo();
      }

      if (currentUserInfo) {
        if (isAuthPage || pathname === "/") {
          router.push("/mainApp/posts");
          return;
        }
      } else {
        if (!isAuthPage) {
          router.push("/auth/login");
          return;
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  return { isLoading };
};

export default useAuthRedirect;
