export interface User {
  id: string;
  name: string;
  email: string;
  iconImageUrl: string;
}

export interface Post {
  id: string;
  body: string;
  userId: string;
  createdAt: string;
  user: User;
}


interface ApiResponse<T> {
  success: boolean;
  userData?: T;
  token?: string;
  error?: string;
}

const API_BASE_URL = 'https://simp-340605.an.r.appspot.com';

export async function createAccount(data: { name: string; email: string; password: string }): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { success: false, error: result.message };
    }
    return { success: true, userData: result.user, token: result.token };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

export async function signIn(data: { email: string; password: string }): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { success: false, error: result.message };
    }
    return { success: true, userData: result.user, token: result.token };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

export async function getUserData(token: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/account`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return { success: false, error: result.message };
    }
    return { success: true, userData: result.user };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

export async function uploadIconImage(token: string, file: File): Promise<ApiResponse<User>> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/account/icon_image`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      return { success: false, error: result.message };
    }
    return { success: true, userData: result.user };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

export async function createPost(token: string, postContent: string): Promise<ApiResponse<Post>> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ post: { body: postContent } }),
    });
    const result = await response.json();
    if (!response.ok) {
      return { success: false, error: result.message };
    }
    return { success: true, userData: result.post };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

export async function getPosts(token: string): Promise<ApiResponse<Post[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return { success: false, error: result.message };
    }
    return { success: true, userData: result.posts };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

export async function deletePost(token: string, postId: string): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return { success: false, error: 'Failed to delete post' };
    }
    return { success: true, userData: null };
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}
