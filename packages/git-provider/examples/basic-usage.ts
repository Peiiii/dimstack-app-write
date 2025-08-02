import { GitHubProvider, GiteeProvider, GitFileSystem } from '../src';

/**
 * 基础使用示例
 * 展示git-provider库的基本功能
 */
async function basicUsage() {
  console.log('🚀 Git Provider Basic Usage Examples\n');

  // 1. 创建GitHub Provider
  const githubProvider = new GitHubProvider({
    token: process.env.GITHUB_TOKEN || 'your-github-token'
  });

  // 2. 创建Gitee Provider
  const giteeProvider = new GiteeProvider({
    token: process.env.GITEE_TOKEN || 'your-gitee-token'
  });

  try {
    // 3. 获取用户信息
    console.log('📋 Getting user info...');
    const userInfo = await githubProvider.getUserInfo();
    console.log(`✅ User: ${userInfo.data.name} (@${userInfo.data.login})`);

    // 4. 获取仓库信息
    console.log('\n📦 Getting repository info...');
    const repoInfo = await githubProvider.getRepository({
      owner: 'octocat',
      repo: 'Hello-World'
    });
    console.log(`✅ Repository: ${repoInfo.data.fullName}`);
    console.log(`   Description: ${repoInfo.data.description || 'No description'}`);
    console.log(`   Private: ${repoInfo.data.private ? 'Yes' : 'No'}`);

    // 5. 获取分支列表
    console.log('\n🌿 Getting branches...');
    const branches = await githubProvider.getBranches({
      owner: 'octocat',
      repo: 'Hello-World'
    });
    console.log(`✅ Found ${branches.data.length} branches:`);
    branches.data.forEach(branch => {
      console.log(`   - ${branch.name} (${branch.protected ? 'protected' : 'unprotected'})`);
    });

    // 6. 文件系统操作
    console.log('\n📁 File system operations...');
    const fs = new GitFileSystem(githubProvider, {
      owner: 'octocat',
      repo: 'Hello-World'
    });

    // 读取文件
    try {
      const readmeContent = await fs.readFile('README.md', { 
        owner: 'octocat',
        repo: 'Hello-World',
        encoding: 'utf-8' 
      });
      const content = typeof readmeContent === 'string' ? readmeContent : new TextDecoder().decode(readmeContent);
      console.log(`✅ README.md content (first 100 chars): ${content.substring(0, 100)}...`);
    } catch (error) {
      console.log('⚠️ Could not read README.md (file might not exist)');
    }

    // 列出目录内容
    try {
      const files = await fs.readdir('');
      console.log(`✅ Repository contains ${files.length} items:`);
      files.forEach(file => {
        console.log(`   - ${file.name} (${file.type})`);
      });
    } catch (error) {
      console.log('⚠️ Could not list directory contents');
    }

    // 7. 版本管理功能
    console.log('\n📜 Version management...');
    const commits = await githubProvider.getCommits({
      owner: 'octocat',
      repo: 'Hello-World',
      per_page: 5
    });
    console.log(`✅ Recent commits:`);
    commits.data.forEach(commit => {
      console.log(`   - ${commit.sha.substring(0, 7)}: ${commit.message}`);
      console.log(`     Author: ${commit.author.name} (${commit.author.date})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

/**
 * 跨平台示例
 * 展示如何在GitHub和Gitee之间切换
 */
async function crossPlatformExample() {
  console.log('\n🔄 Cross-Platform Example\n');

  const providers = {
    github: new GitHubProvider({
      token: process.env.GITHUB_TOKEN || 'your-github-token'
    }),
    gitee: new GiteeProvider({
      token: process.env.GITEE_TOKEN || 'your-gitee-token'
    })
  };

  for (const [platform, provider] of Object.entries(providers)) {
    try {
      console.log(`📋 Testing ${platform.toUpperCase()}...`);
      
      const userInfo = await provider.getUserInfo();
      console.log(`✅ ${platform.toUpperCase()} User: ${userInfo.data.name}`);

      const repos = await provider.getRepository({
        owner: userInfo.data.login,
        repo: 'test-repo' // 假设的仓库名
      });
      console.log(`✅ ${platform.toUpperCase()} Repository: ${repos.data.name}`);

    } catch (error) {
      console.log(`⚠️ ${platform.toUpperCase()} test failed: ${error.message}`);
    }
  }
}

/**
 * 高级功能示例
 * 展示分支管理、拉取请求等高级功能
 */
async function advancedFeatures() {
  console.log('\n⚡ Advanced Features Example\n');

  const provider = new GitHubProvider({
    token: process.env.GITHUB_TOKEN || 'your-github-token'
  });

  try {
    // 创建新分支
    console.log('🌿 Creating new branch...');
    const newBranch = await provider.createBranch({
      owner: 'your-username',
      repo: 'test-repo',
      branch: 'feature/new-feature',
      ref: 'main'
    });
    console.log(`✅ Created branch: ${newBranch.data.name}`);

    // 在新分支上创建文件
    console.log('📝 Creating file in new branch...');
    await provider.putFile({
      owner: 'your-username',
      repo: 'test-repo',
      path: 'docs/new-feature.md',
      content: '# New Feature\n\nThis is a new feature document.',
      message: 'Add new feature documentation',
      branch: 'feature/new-feature'
    });
    console.log('✅ File created in new branch');

    // 创建拉取请求
    console.log('🔀 Creating pull request...');
    const pr = await provider.createPullRequest({
      owner: 'your-username',
      repo: 'test-repo',
      title: 'Add new feature documentation',
      body: 'This PR adds documentation for the new feature.',
      head: 'feature/new-feature',
      base: 'main'
    });
    console.log(`✅ Pull request created: ${pr.data.htmlUrl}`);

    // 获取差异
    console.log('🔍 Getting diff...');
    const diff = await provider.getDiff({
      owner: 'your-username',
      repo: 'test-repo',
      base: 'main',
      head: 'feature/new-feature'
    });
    console.log(`✅ Found ${diff.data.length} changed files:`);
    diff.data.forEach(file => {
      console.log(`   - ${file.filename}: ${file.status} (+${file.additions}, -${file.deletions})`);
    });

  } catch (error) {
    console.log('⚠️ Advanced features test failed (this is expected if test repository doesn\'t exist):');
    console.log(`   ${error.message}`);
  }
}

/**
 * 错误处理示例
 */
async function errorHandling() {
  console.log('\n🛡️ Error Handling Example\n');

  const provider = new GitHubProvider({
    token: 'invalid-token'
  });

  try {
    await provider.getUserInfo();
  } catch (error) {
    console.log('✅ Error properly caught and handled:');
    console.log(`   ${error.message}`);
  }
}

// 主函数
async function main() {
  console.log('🎯 Git Provider Examples\n');

  await basicUsage();
  await crossPlatformExample();
  await advancedFeatures();
  await errorHandling();

  console.log('\n✨ All examples completed!');
  console.log('\n📚 Next steps:');
  console.log('1. Set up your GitHub/Gitee tokens as environment variables');
  console.log('2. Create test repositories to try the examples');
  console.log('3. Explore the advanced examples in the examples/ directory');
  console.log('4. Build your own applications using git-provider!');
}

// 如果直接运行此文件
if (require.main === module) {
  main().catch(console.error);
}

export { basicUsage, crossPlatformExample, advancedFeatures, errorHandling }; 