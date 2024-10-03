import { API_BASE_URL } from "./config";

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export async function apiRequest<T>(
  endpoint: string,
  method: string,
  token: string | null,
  body?: any,
  isFormData: boolean = false
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      let errorMessage = "エラーが発生しました";

      switch (response.status) {
        case 400:
          errorMessage = result.message || "リクエストが不正です";
          break;
        case 401:
          errorMessage = "認証エラーです。再度ログインしてください。";
          break;
        case 403:
          errorMessage = "アクセスが拒否されました";
          break;
        case 404:
          errorMessage = "リソースが見つかりませんでした";
          break;
        case 422:
          errorMessage = result.message || "入力値に誤りがあります";
          break;
        case 500:
          errorMessage = "サーバーエラーが発生しました";
          break;
        default:
          if (result && result.message) {
            errorMessage = result.message;
          }
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: "ネットワークエラーが発生しました",
    };
  }
}
