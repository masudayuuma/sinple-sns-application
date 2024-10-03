import { uploadIconImage } from "@/lib/api";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/config";
import { userState } from "@/lib/recoil/atoms";
import { useSetRecoilState } from "recoil";
import useFlashMessage from "@/lib/hooks/useFlashMessage";

interface UseEditProfileReturn {
  changeIcon: (icon: File) => Promise<void>;
}

export default function (): UseEditProfileReturn {
  const setUserInfo = useSetRecoilState(userState);
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const { showFlashMessage } = useFlashMessage();

  const changeIcon = async (icon: File) => {
    if (!storedToken) {
      showFlashMessage(
        "トークンが存在しません。再度ログインしてください。",
        "error"
      );
      return;
    }
    const response = await uploadIconImage(storedToken, icon);
    if (response.success) {
      setUserInfo(response.data);
    } else {
      showFlashMessage(response.error, "error");
    }
  };
  return { changeIcon };
}
