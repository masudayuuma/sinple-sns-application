import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { userState, tokenState } from '../recoil/atoms';
import { getUserData, signIn, createAccount } from '../utils/api';

const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      getUserData(storedToken).then(response => {
        if (response.success) {
          setUser(response.userData);
          setToken(storedToken);
          router.push('/posts');
        } else {
          localStorage.removeItem('token');
        }
      });
    }
  }, [router, setToken, setUser]);

  const login = async (email: string, password: string) => {
    const response = await signIn({ email, password });
    if (response.success) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      const userDataResponse = await getUserData(response.token);
      if (userDataResponse.success) {
        setUser(userDataResponse.userData);
        router.push('/posts');
      }
    } else {
      alert(response.error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await createAccount({ username, email, password });
    if (response.success) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      const userDataResponse = await getUserData(response.token);
      if (userDataResponse.success) {
        setUser(userDataResponse.userData);
        router.push('/posts');
      }
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
