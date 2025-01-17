import { LoggedInUser, Post } from "./types";
import { apiRequest, ApiResponse } from "./apiClient";

export async function createAccount(data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<{ user: LoggedInUser; token: string }>> {
  return await apiRequest<{ user: LoggedInUser; token: string }>(
    "/account",
    "POST",
    data
  );
}

export async function signIn(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ user: LoggedInUser; token: string }>> {
  return await apiRequest<{ user: LoggedInUser; token: string }>(
    "/auth",
    "POST",
    data
  );
}

export async function getUserData(): Promise<ApiResponse<LoggedInUser>> {
  const response = await apiRequest<{ user: LoggedInUser }>("/account", "GET");
  if (response.success) {
    return { success: true, data: response.data.user };
  } else {
    return response;
  }
}

export async function uploadIconImage(
  file: File
): Promise<ApiResponse<LoggedInUser>> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiRequest<{ user: LoggedInUser }>(
    "/account/icon_image",
    "PATCH",
    formData,
    {
      "Content-Type": "",
    }
  );
  if (response.success) {
    return { success: true, data: response.data.user };
  } else {
    return response;
  }
}

export async function createPost(
  postContent: string
): Promise<ApiResponse<Post>> {
  const response = await apiRequest<{ post: Post }>("/posts", "POST", {
    post: { body: postContent },
  });
  if (response.success) {
    return { success: true, data: response.data.post };
  } else {
    return response;
  }
}

export async function getPosts(): Promise<ApiResponse<Post[]>> {
  const response = await apiRequest<{ posts: Post[] }>("/posts", "GET");
  if (response.success) {
    return { success: true, data: response.data.posts };
  } else {
    return response;
  }
}

export async function deletePost(postId: string): Promise<ApiResponse<null>> {
  return await apiRequest<null>(`/posts/${postId}`, "DELETE");
}
