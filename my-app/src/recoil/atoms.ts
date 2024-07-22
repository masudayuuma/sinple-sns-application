import { atom } from 'recoil';

// ユーザー情報の型定義
interface User {
  id: string;
  name: string; // 'name' プロパティを追加
  email: string;
  iconImageUrl?: string;
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
