"use client";

import { createPost } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/lib/recoil/atoms";

type FlashMessageType = "success" | "error";

export default function useMakeNewPost(
  showFlashMessage: (message: string, type: FlashMessageType) => void
) {
  const router = useRouter();
  const token = useRecoilValue(tokenState);

  const makeNewPost = async (content: string) => {
    if (!token) {
      showFlashMessage(
        "トークンが存在しません。再度ログインしてください。",
        "error"
      );
      return;
    }
    const { success, error, userData } = await createPost(token, content);
    if (success && userData) {
      router.push("/mainApp/posts?success=true");
    } else if (!success && error) {
      showFlashMessage(error, "error");
    } else {
      showFlashMessage("予期しないエラーが発生しました。", "error");
    }
  };
  return { makeNewPost };
}
