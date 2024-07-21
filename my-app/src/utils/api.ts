export async function createAccount(data: { username: string; email: string; password: string }) {
    try {
      const response = await fetch('https://anycloud-inc.github.io/simple-sns-openapi/document.html#operation/createAccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
      const result = await response.json();
      return { success: true, token: result.token };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }
  
  export async function signIn(data: { email: string; password: string }) {
    try {
      const response = await fetch('https://anycloud-inc.github.io/simple-sns-openapi/document.html#operation/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
      const result = await response.json();
      return { success: true, token: result.token };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }
  
  export async function getUserData(token: string) {
    try {
      const response = await fetch('https://anycloud-inc.github.io/simple-sns-openapi/document.html#operation/getAccount', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return { success: false };
      }
      const userData = await response.json();
      return { success: true, userData };
    } catch (error) {
      return { success: false };
    }
  }
  