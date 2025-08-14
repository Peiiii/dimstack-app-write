// 生成随机状态字符串
export function generateState(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// 验证状态参数
export function validateState(receivedState: string, originalState: string): boolean {
  return receivedState === originalState;
}

// 解析授权码
export function parseAuthCode(url: string): { code?: string; state?: string; error?: string } {
  try {
    const urlObj = new URL(url);
    const code = urlObj.searchParams.get('code');
    const state = urlObj.searchParams.get('state');
    const error = urlObj.searchParams.get('error');
    
    return {
      code: code || undefined,
      state: state || undefined,
      error: error || undefined
    };
  } catch {
    return {};
  }
}

// 构建查询字符串
export function buildQueryString(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
