import { atom } from "recoil";
import { LoggedInUser, FlashMessageType } from "../types";

interface FlashMessageState {
  message: string;
  type: FlashMessageType;
  isVisible: boolean;
}

export const userState = atom<LoggedInUser | null>({
  key: "userState",
  default: null,
});

export const FlashMessageState = atom<FlashMessageState>({
  key: "flashMessageState",
  default: {
    message: "",
    type: "success",
    isVisible: false,
  },
});
