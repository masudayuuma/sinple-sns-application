export interface User {
  id: string;
  name: string;
  iconImageUrl?: string;
}

export interface LoggedInUser extends User {
  email: string;
}

export interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: string;
  user: User;
}

export type FlashMessageType = "success" | "error";
