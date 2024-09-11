import { atom } from "recoil";

export interface User {
  id: string;
  name: string;
  email: string;
  iconImageUrl?: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});
