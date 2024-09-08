"use client";

import { createPost } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/recoil/atoms";

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
    const response = await createPost(token, content);
    console.log("response");
    if (response.success) {
      console.log("success");
      router.push("/mainApp/posts?success=true");
    } else if (response.error) {
      showFlashMessage(response.error, "error");
    } else {
      showFlashMessage("予期しないエラーが発生しました。", "error");
    }
  };
  return { makeNewPost };
}
