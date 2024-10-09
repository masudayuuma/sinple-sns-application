import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { userState } from "../recoil/atoms";
import { getUserData, signIn, createAccount } from "../api";
import { LOCAL_STORAGE_TOKEN_KEY } from "../config";
import useFlashMessage from "./useFlashMessage";

const useAuth = () => {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const { showFlashMessage } = useFlashMessage();

  const fetchAndSetUserInfo = async () => {
    const response = await getUserData();
    if (response.success) {
      setUser(response.data);
      return response.data;
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      router.push("/auth/login");
      showFlashMessage(response.error, "error");
      return null;
    }
  };

  const performLogin = async (email: string, password: string) => {
    const response = await signIn({
      email,
      password,
    });
    if (response.success) {
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      router.push("/mainApp/posts");
    } else {
      showFlashMessage(response.error, "error");
    }
  };

  const performRegistration = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await createAccount({
      name,
      email,
      password,
    });
    if (response.success) {
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
      router.push("/mainApp/posts");
    } else {
      showFlashMessage(response.error, "error");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    router.push("/auth/login");
    showFlashMessage("ログアウトしました", "success");
  };

  return { performLogin, performRegistration, logout, fetchAndSetUserInfo };
};

export default useAuth;
