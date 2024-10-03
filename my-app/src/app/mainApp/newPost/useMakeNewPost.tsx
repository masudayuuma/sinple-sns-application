import { createPost } from "@/lib/api";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/lib/config";
import { useRouter } from "next/navigation";
import useFlashMessage from "@/lib/hooks/useFlashMessage";

export default function useMakeNewPost() {
  const router = useRouter();
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const { showFlashMessage } = useFlashMessage();

  const makeNewPost = async (content: string) => {
    if (!storedToken) {
      showFlashMessage(
        "トークンが存在しません。再度ログインしてください。",
        "error"
      );
      return;
    }
    const response = await createPost(storedToken, content);
    if (response.success) {
      router.push("/mainApp/posts");
      showFlashMessage("投稿に成功しました", "success");
    } else {
      showFlashMessage(response.error, "error");
    }
  };
  return { makeNewPost };
}
