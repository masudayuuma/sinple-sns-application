import { User } from "../recoil/atoms";
import { Post } from "../hooks/usePosts";

interface ApiResponse<T> {
  success: boolean;
  userData?: T;
  token?: string;
  error?: string | null;
}

const API_BASE_URL = "https://simp-340605.an.r.appspot.com";

export async function createAccount(data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 500) {
      return {
        success: false,
        error: "アカウントの作成に失敗しました",
      };
    } else if (response.status === 422) {
      return {
        success: false,
        error: "同一のメールアドレスが既に登録されています",
      };
    } else return { success: true, userData: result.user, token: result.token };
  } catch (error) {
    return { success: false, error: " ネットワークエラーが発生しました" };
  }
}

export async function signIn(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    console.log(response);
    if (response.status === 500) {
      return {
        success: false,
        error: "ログインに失敗しました",
      };
    } else if (response.status === 400) {
      return {
        success: false,
        error: result.message,
      };
    } else return { success: true, userData: result.user, token: result.token };
  } catch (error) {
    return { success: false, error: "ネットワークエラーが発生しました" };
  }
}

export async function getUserData(token: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok || Object.keys(result).length === 0) {
      return {
        success: false,
        error: "データの取得に失敗しました",
      };
    } else return { success: true, userData: result.user };
  } catch (error) {
    return { success: false, error: "ネットワークエラーが発生しました" };
  }
}

export async function uploadIconImage(
  token: string,
  file: File
): Promise<ApiResponse<User>> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${API_BASE_URL}/account/icon_image`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await response.json();
    if (response.status === 500) {
      return {
        success: false,
        error: "アイコン画像のアップロードに失敗しました",
      };
    } else if (response.status === 401) {
      return {
        success: false,
        error: "認証エラーです",
      };
    } else return { success: true, userData: result.user };
  } catch (error) {
    return { success: false, error: "ネットワークエラーです" };
  }
}

export async function createPost(
  token: string,
  postContent: string
): Promise<ApiResponse<Post>> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: { body: postContent } }),
    });
    const result = await response.json();
    if (response.status === 401) {
      return { success: false, error: "認証エラーです" };
    } else if (response.status === 400) {
      return { success: false, error: result.message };
    } else return { success: true, userData: result.post };
  } catch (error) {
    return { success: false, error: "ネットワークエラーです" };
  }
}

export async function getPosts(token: string): Promise<ApiResponse<Post[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (response.status === 401) {
      return { success: false, error: "認証エラーです" };
    } else return { success: true, userData: result.posts };
  } catch (error) {
    return { success: false, error: "ネットワークエラーです" };
  }
}

export async function deletePost(
  token: string,
  postId: string
): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      return { success: false, error: "認証エラーです" };
    } else if (response.status === 404) {
      return { success: false, error: "投稿が見つかりません" };
    } else return { success: true, userData: null };
  } catch (error) {
    return { success: false, error: "ネットワークエラーです" };
  }
}
