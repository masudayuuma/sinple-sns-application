import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter, usePathname } from 'next/navigation';
import { userState, tokenState } from '../recoil/atoms';
import { getUserData, signIn, createAccount, User } from '../utils/api';  // User 型をインポート

const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();
  const pathname = usePathname();  // 現在のパスを取得

  useEffect(() => {
    // /auth ページではログイン状態のチェックを行わない
    if (pathname.startsWith('/auth')) {
      return;
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      getUserData(storedToken).then(response => {
        if (response.success && response.userData) {
          setUser(response.userData);  // ユーザーデータを設定
          setToken(storedToken);
          console.log('User data set in state:', response.userData); // デバッグ用に追加
          router.push('/posts');
        } else {
          localStorage.removeItem('token');
          router.push('/auth/login');  // ログインページにリダイレクト
        }
      });
    } else {
      router.push('/auth/login');  // ログインページにリダイレクト
    }
  }, [router, setToken, setUser, pathname]);

  const login = async (email: string, password: string) => {
    const response = await signIn({ email, password });
    if (response.success && response.userData && response.token) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.userData);  // ユーザーデータを設定
      router.push('/posts');
    } else {
      alert(response.error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await createAccount({ name, email, password });
    if (response.success && response.userData && response.token) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.userData);  // ユーザーデータを設定
      router.push('/posts');
    } else {
      alert(response.error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return { user, login, register, logout };
};

export default useAuth;
