import { uploadIconImage } from "@/lib/api";
import { userState } from "@/lib/recoil/atoms";
import { useSetRecoilState } from "recoil";
import useFlashMessage from "@/lib/hooks/useFlashMessage";

interface UseEditProfileReturn {
  changeIcon: (icon: File) => Promise<void>;
}

export default function (): UseEditProfileReturn {
  const setUserInfo = useSetRecoilState(userState);
  const { showFlashMessage } = useFlashMessage();

  const changeIcon = async (icon: File) => {
    const response = await uploadIconImage(icon);
    if (response.success) {
      setUserInfo(response.data);
    } else {
      showFlashMessage(response.error, "error");
    }
  };
  return { changeIcon };
}
