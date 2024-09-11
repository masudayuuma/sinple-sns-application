import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { userState, tokenState } from "../recoil/atoms";
import { getUserData, signIn, createAccount } from "../api";

const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const router = useRouter();

  const getCurrentUserInfo = async (token: string) => {
    const { success, userData } = await getUserData(token);
    if (success && userData) {
      setUser(userData);
      setToken(token);
    } else {
      localStorage.removeItem("token");
      router.push("/auth/login?success=false");
    }
  };

  const login = async (email: string, password: string) => {
    const { success, userData, token, error } = await signIn({
      email,
      password,
    });
    if (success && userData && token) {
      setUser(userData);
      setToken(token);
      localStorage.setItem("token", token);
      router.push("/mainApp/posts");
      return null;
    } else {
      return error || "予期しないエラーが発生しました";
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const { success, userData, token, error } = await createAccount({
      name,
      email,
      password,
    });
    if (success && userData && token) {
      setUser(userData);
      setToken(token);
      localStorage.setItem("token", token);
      router.push("/mainApp/posts");
      return null;
    } else {
      return error || "予期しないエラーが発生しました";
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    router.push("/auth/login?success=true");
  };

  return { login, register, logout, getCurrentUserInfo };
};

export default useAuth;
