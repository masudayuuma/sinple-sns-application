export interface User {
  id: string;
  name: string;
  email: string;
  iconImageUrl?: string;
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
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }
    const result = await response.json();
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
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }
    const result = await response.json();
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
    if (!response.ok) {
      console.error('Failed to fetch user data:', response.statusText);
      return { success: false };
    }
    const userData = await response.json();
    console.log('User data fetched:', userData); // デバッグ用に追加
    return { success: true, userData };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { success: false };
  }
}
