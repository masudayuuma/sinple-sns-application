import { atom } from 'recoil';
import { User } from '../utils/api';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
});
