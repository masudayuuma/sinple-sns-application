import { tokenState, userState } from "@/recoil/atoms";
import { uploadIconImage } from "@/utils/api";
import { useRecoilState, useRecoilValue } from "recoil";

export default function (
  showFlashMessage: (message: string, type: "success" | "error") => void
) {
  const token = useRecoilValue(tokenState);
  const [userInfo, setUserInfo] = useRecoilState(userState);

  const changeIcon = async (icon: File) => {
    if (!token) {
      showFlashMessage(
        "トークンが存在しません。再度ログインしてください。",
        "error"
      );
      return;
    }
    const { success, userData, error } = await uploadIconImage(token, icon);
    if (success && userData) {
      setUserInfo(userData);
    } else if (!success && error) {
      showFlashMessage(error, "error");
    } else {
      showFlashMessage("予期しないエラーが発生しました。", "error");
    }
  };
  return { changeIcon };
}
