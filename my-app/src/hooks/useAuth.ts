import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter, usePathname } from 'next/navigation';
import { userState, tokenState } from '../recoil/atoms';
import { getUserData, signIn, createAccount, User, ApiResponse } from '../utils/api';

const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    if (pathname.startsWith('/auth')) {
      return;
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      getUserData(storedToken).then(response => {
        if (response.success && response.userData) {
          setUser(response.userData);
          setToken(storedToken);
        } else {
          localStorage.removeItem('token');
          router.push('/auth/login?success=false');
        }
        });
      } else {
      router.push('/auth/login');
    }
  }, [pathname, router]);

  const login = async (email: string, password: string): Promise<ApiResponse<null>> => {
    const response = await signIn({ email, password });
    if (response.success && response.userData && response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.userData);
        router.push('/posts');
        return { success: true, error: null };
    } else {
        console.log(response.error);
        return { success: false, error: response.error };
    }
};

  const register = async (name: string, email: string, password: string) => {
    const response = await createAccount({ name, email, password });
    if (response.success && response.userData && response.token) {
      localStorage.setItem('token', response.token);
      router.push('/posts');
      return { success: true, error: null };
    } else {
      console.log (response.error);
      return { success :false , error: response.error };
    }
  };

  const logout = () => {
    alert('ログアウトします');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    router.push('/auth/login?success=true');
  };

  return {login, register, logout};
};

export default useAuth;
