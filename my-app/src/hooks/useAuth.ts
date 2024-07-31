import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter, usePathname } from 'next/navigation';
import { userState, tokenState } from '../recoil/atoms';
import { getUserData, signIn, createAccount,} from '../utils/api'; 

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
          router.push('/auth/login');
        }
      });
    } else {
      router.push('/auth/login');
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await signIn({ email, password });
    if (response.success && response.userData && response.token) {
      localStorage.setItem('token', response.token);
      router.push('/posts');
    } else {
      alert(response.error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await createAccount({ name, email, password });
    if (response.success && response.userData && response.token) {
      localStorage.setItem('token', response.token);
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

  return { login, register, logout };
};

export default useAuth;
