import { API_BASE_URL, LOCAL_STORAGE_TOKEN_KEY } from "./config";

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

function getErrorMessage(status: number, result: any): string {
  let errorMessage = "エラーが発生しました";

  switch (status) {
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

  return errorMessage;
}

export async function apiRequest<T>(
  endpoint: string,
  method: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let requestBody = body;
    if (body instanceof FormData) {
      requestBody = body;
    } else {
      requestBody = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: requestBody,
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status, result);

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
