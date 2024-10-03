"use client";

import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { useRecoilState } from "recoil";
import { userState } from "@/lib/recoil/atoms";
import { usePathname, useRouter } from "next/navigation";
import { LOCAL_STORAGE_TOKEN_KEY } from "../config";

const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { fetchAndSetUserInfo } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      const isAuthPage = pathname.startsWith("/auth");

      if (storedToken) {
        if (isAuthPage || pathname === "/") {
          router.push("/mainApp/posts");
          return;
        } else if (userInfo === null) {
          await fetchAndSetUserInfo(storedToken);
        }
      } else {
        if (!isAuthPage) {
          router.push("/auth/login");
          return;
        } else if (userInfo) {
          setUserInfo(null);
          localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  return { isLoading };
};

export default useAuthRedirect;
