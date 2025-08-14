import { GitAuth, generateState, parseAuthCode, GitHubProvider, GiteeProvider } from '../src';

// 示例：GitHub认证（使用自定义HTTP客户端解决跨域）
async function githubAuthExample() {
  // 1. 创建GitHub提供者，配置自定义HTTP客户端
  const githubProvider = new GitHubProvider({
    httpClient: {
      fetch: async (url, options) => {
        // 对token交换请求使用proxy解决跨域
        if (url.includes('github.com/login/oauth/access_token')) {
          const proxyUrl = `https://proxy.brainbo.fun/?${url}`;
          return fetch(proxyUrl, options);
        }
        // 其他请求直接使用fetch
        return fetch(url, options);
      }
    }
  });
  
  // 2. 创建认证实例
  const auth = new GitAuth(githubProvider, {
    clientId: 'your-github-client-id',
    clientSecret: 'your-github-client-secret',  // 添加clientSecret
    redirectUri: 'https://your-app.com/auth/github/callback',
    scopes: ['repo', 'user']
  });

  // 3. 启动认证流程
  const state = generateState(32);
  const authUrl = await auth.startAuth({ state });
  
  console.log('认证URL:', authUrl);
  console.log('状态参数:', state);
  
  // 4. 重定向用户（在实际应用中）
  // window.location.href = authUrl;
}

// 示例：Gitee认证（使用默认HTTP客户端）
async function giteeAuthExample() {
  // 1. 创建Gitee提供者，不配置HTTP客户端（使用默认fetch）
  const giteeProvider = new GiteeProvider();
  
  // 2. 创建认证实例
  const auth = new GitAuth(giteeProvider, {
    clientId: 'your-gitee-client-id',
    clientSecret: 'your-gitee-client-secret',  // 添加clientSecret
    redirectUri: 'https://your-app.com/auth/gitee/callback',
    scopes: ['projects', 'user_info']
  });

  const state = generateState(32);
  const authUrl = await auth.startAuth({ state });
  
  console.log('认证URL:', authUrl);
  console.log('状态参数:', state);
}

// 示例：处理回调
async function handleCallbackExample() {
  // 模拟回调URL
  const callbackUrl = 'https://your-app.com/auth/github/callback?code=abc123&state=xyz789';
  
  // 解析回调参数
  const { code, state, error } = parseAuthCode(callbackUrl);
  
  if (error) {
    console.error('认证错误:', error);
    return;
  }
  
  if (code && state) {
    console.log('授权码:', code);
    console.log('状态参数:', state);
    
    // 在实际应用中，这里会调用 auth.handleCallback(code, state)
  }
}

// 示例：高级HTTP客户端配置
async function advancedHttpClientExample() {
  // 创建带有完整HTTP客户端配置的GitHub Provider
  const githubProvider = new GitHubProvider({
    httpClient: {
      fetch: async (url, options) => {
        // 添加自定义请求头
        const customOptions = {
          ...options,
          headers: {
            ...options.headers,
            'X-Custom-Header': 'custom-value',
            'User-Agent': 'MyApp/1.0'
          }
        };

        // 对特定URL使用不同的处理逻辑
        if (url.includes('github.com/login/oauth/access_token')) {
          // 使用proxy
          const proxyUrl = `https://proxy.brainbo.fun/?${url}`;
          return fetch(proxyUrl, customOptions);
        } else if (url.includes('api.github.com/user')) {
          // 添加重试逻辑
          let lastError;
          for (let i = 0; i < 3; i++) {
            try {
              return await fetch(url, customOptions);
            } catch (error) {
              lastError = error;
              if (i < 2) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
              }
            }
          }
          throw lastError;
        }

        // 默认请求
        return fetch(url, customOptions);
      }
    }
  });

  const auth = new GitAuth(githubProvider, {
    clientId: 'your-github-client-id',
    clientSecret: 'your-github-client-secret',  // 添加clientSecret
    redirectUri: 'https://your-app.com/callback',
    scopes: ['repo', 'user']
  });

  console.log('高级HTTP客户端配置完成');
}

// 运行示例
async function runExamples() {
  console.log('=== GitHub认证示例（带HTTP客户端配置）===');
  await githubAuthExample();
  
  console.log('\n=== Gitee认证示例（默认HTTP客户端）===');
  await giteeAuthExample();
  
  console.log('\n=== 回调处理示例 ===');
  await handleCallbackExample();
  
  console.log('\n=== 高级HTTP客户端配置示例 ===');
  await advancedHttpClientExample();
}

// 如果直接运行此文件
if (require.main === module) {
  runExamples().catch(console.error);
}

export { githubAuthExample, giteeAuthExample, handleCallbackExample, advancedHttpClientExample };
