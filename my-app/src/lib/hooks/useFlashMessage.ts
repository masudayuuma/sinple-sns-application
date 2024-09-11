import { useState } from "react";

type FlashMessageType = "success" | "error";

const useFlashMessage = () => {
  const [flashMessage, setFlashMessage] = useState("");
  const [type, setType] = useState<FlashMessageType>("success");
  const [isVisible, setIsVisible] = useState(false);

  const showFlashMessage = (message: string, type: FlashMessageType) => {
    setFlashMessage(message);
    setType(type);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      setFlashMessage("");
    }, 3000);
  };

  return { flashMessage, type, isVisible, showFlashMessage };
};

export default useFlashMessage;
