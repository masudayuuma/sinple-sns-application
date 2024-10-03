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
    null,
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
    null,
    data
  );
}

export async function getUserData(
  token: string
): Promise<ApiResponse<LoggedInUser>> {
  const response = await apiRequest<{ user: LoggedInUser }>(
    "/account",
    "GET",
    token
  );
  if (response.success) {
    return { success: true, data: response.data.user };
  } else {
    return response;
  }
}

export async function uploadIconImage(
  token: string,
  file: File
): Promise<ApiResponse<LoggedInUser>> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiRequest<{ user: LoggedInUser }>(
    "/account/icon_image",
    "PATCH",
    token,
    formData,
    true
  );
  if (response.success) {
    return { success: true, data: response.data.user };
  } else {
    return response;
  }
}

export async function createPost(
  token: string,
  postContent: string
): Promise<ApiResponse<Post>> {
  const response = await apiRequest<{ post: Post }>("/posts", "POST", token, {
    post: { body: postContent },
  });
  if (response.success) {
    return { success: true, data: response.data.post };
  } else {
    return response;
  }
}

export async function getPosts(token: string): Promise<ApiResponse<Post[]>> {
  const response = await apiRequest<{ posts: Post[] }>("/posts", "GET", token);
  if (response.success) {
    return { success: true, data: response.data.posts };
  } else {
    return response;
  }
}

export async function deletePost(
  token: string,
  postId: string
): Promise<ApiResponse<null>> {
  return await apiRequest<null>(`/posts/${postId}`, "DELETE", token);
}
