import { createPost } from "@/lib/api";
import { useRouter } from "next/navigation";
import useFlashMessage from "@/lib/hooks/useFlashMessage";

export default function useMakeNewPost() {
  const router = useRouter();
  const { showFlashMessage } = useFlashMessage();

  const makeNewPost = async (content: string) => {
    const response = await createPost(content);
    if (response.success) {
      router.push("/mainApp/posts");
      showFlashMessage("投稿に成功しました", "success");
    } else {
      showFlashMessage(response.error, "error");
    }
  };
  return { makeNewPost };
}
