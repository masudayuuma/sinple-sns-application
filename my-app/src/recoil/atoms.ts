import { atom } from 'recoil';

// ユーザー情報の型定義
interface User {
  id: string;
  username: string;
  email: string;
  // その他のユーザー情報
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
});
