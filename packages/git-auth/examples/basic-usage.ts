import { GitAuth, generateState, parseAuthCode, GitHubProvider, GiteeProvider } from '../src';

// 示例：GitHub认证
async function githubAuthExample() {
  // 1. 创建GitHub提供者
  const githubProvider = new GitHubProvider();
  
  // 2. 创建认证实例
  const auth = new GitAuth(githubProvider, {
    clientId: 'your-github-client-id',
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

// 示例：Gitee认证
async function giteeAuthExample() {
  // 1. 创建Gitee提供者
  const giteeProvider = new GiteeProvider();
  
  // 2. 创建认证实例
  const auth = new GitAuth(giteeProvider, {
    clientId: 'your-gitee-client-id',
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

// 运行示例
async function runExamples() {
  console.log('=== GitHub认证示例 ===');
  await githubAuthExample();
  
  console.log('\n=== Gitee认证示例 ===');
  await giteeAuthExample();
  
  console.log('\n=== 回调处理示例 ===');
  await handleCallbackExample();
}

// 如果直接运行此文件
if (require.main === module) {
  runExamples().catch(console.error);
}

export { githubAuthExample, giteeAuthExample, handleCallbackExample };
