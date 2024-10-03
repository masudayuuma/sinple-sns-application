import { useSetRecoilState } from "recoil";
import { FlashMessageState } from "../recoil/atoms";
import { FlashMessageType } from "../types";

const useFlashMessage = () => {
  const setFlashMessage = useSetRecoilState(FlashMessageState);

  const showFlashMessage = (message: string, type: FlashMessageType) => {
    setFlashMessage({ message, type, isVisible: true });
    setTimeout(() => {
      setFlashMessage({
        message: "",
        type: "success",
        isVisible: false,
      });
    }, 3000);
  };

  return { showFlashMessage };
};

export default useFlashMessage;
