"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "./useAuth";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState, userState } from "@/recoil/atoms";

const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const { getCurrentUserInfo } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        if (pathname.startsWith("/auth") || pathname === "/") {
          router.push("/mainApp/posts");
        } else if (userInfo === null || token === null) {
          await getCurrentUserInfo(storedToken);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        if (!pathname.startsWith("/auth")) {
          router.push("/auth/login");
          console.log("redirected to login page");
        } else if (userInfo || token) {
          setUserInfo(null);
          setToken(null);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  return { isLoading };
};

export default useAuthRedirect;
