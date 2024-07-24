import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter, usePathname } from 'next/navigation';
import { userState, tokenState } from '../recoil/atoms';
import { getUserData, signIn, createAccount, User } from '../utils/api'; 

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
          setUser(response.userData);
          setToken(storedToken);
          console.log('getuserを使ってuserdataを取得:', response.userData);
        } else {
          localStorage.removeItem('token');
          console.log('respons失敗またはuserdataがない(useEffect内)');
          router.push('/auth/login');
        }
      });
    } else {
      router.push('/auth/login');
      console.log('トークンの取得に失敗(useEffect内)');
    }
  }, [router, setToken, setUser, pathname]);

  const login = async (email: string, password: string) => {
    const response = await signIn({ email, password });
    if (response.success && response.userData && response.token) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.userData);
      console.log('ログインに成功しました:', response.userData);
      router.push('/myPage');
    } else {
      console.log('ログインに失敗しました:', response.error);
      alert(response.error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await createAccount({ name, email, password });
    if (response.success && response.userData && response.token) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.userData);  // ユーザーデータを設定
      console.log('新規登録に成功:', response.userData);
      router.push('/myPage');
    } else {
      console.log('新規登録に失敗:', response.error);
      alert(response.error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    console.log('データを削除しました');
    router.push('/auth/login');
  };

  
//userはいるのか？
  return { user, login, register, logout };
};

export default useAuth;
