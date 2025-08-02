import { GitHubProvider, GitFileSystem } from '../src';

/**
 * 团队文档协作系统
 * 支持分支管理、代码审查和合并
 */
export class TeamDocs {
  private provider: GitHubProvider;
  private fs: GitFileSystem;

  constructor(token: string, owner: string, repo: string) {
    this.provider = new GitHubProvider({ token });
    this.fs = new GitFileSystem(this.provider, { owner, repo });
  }

  /**
   * 创建文档草稿
   */
  async createDocumentDraft(title: string, content: string, author: string) {
    const branchName = `docs/${author}/${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    // 创建新分支
    await this.provider.createBranch({
      owner: this.fs.options.owner,
      repo: this.fs.options.repo,
      branch: branchName,
      ref: 'main'
    });

    // 在新分支上创建文档
    const path = `docs/${title}.md`;
    const docContent = this.generateDocumentContent(title, content, author);
    
    await this.provider.putFile({
      owner: this.fs.options.owner,
      repo: this.fs.options.repo,
      path,
      content: docContent,
      message: `Add document draft: ${title}`,
      branch: branchName
    });

    console.log(`✅ Document draft created in branch: ${branchName}`);
    return { branchName, path };
  }

  /**
   * 创建拉取请求
   */
  async createPullRequest(title: string, description: string, branchName: string) {
    const pr = await this.provider.createPullRequest({
      owner: this.fs.options.owner,
      repo: this.fs.options.repo,
      title: `📝 ${title}`,
      body: description,
      head: branchName,
      base: 'main'
    });

    console.log(`✅ Pull request created: ${pr.data.htmlUrl}`);
    return pr.data;
  }

  /**
   * 获取待审查的拉取请求
   */
  async getPendingPullRequests() {
    const prs = await this.provider.getPullRequests({
      owner: this.fs.options.owner,
      repo: this.fs.options.repo,
      state: 'open'
    });

    return prs.data.filter(pr => pr.title.startsWith('📝'));
  }

  /**
   * 审查并合并拉取请求
   */
  async reviewAndMerge(pullNumber: number, approved: boolean, comment?: string) {
    if (approved) {
      const result = await this.provider.mergePullRequest({
        owner: this.fs.options.owner,
        repo: this.fs.options.repo,
        pull_number: pullNumber,
        commit_message: `Merge document: ${comment || 'Approved'}`,
        merge_method: 'squash'
      });

      console.log(`✅ Pull request #${pullNumber} merged`);
      return result.data;
    } else {
      console.log(`❌ Pull request #${pullNumber} rejected: ${comment}`);
      return null;
    }
  }

  /**
   * 获取文档历史
   */
  async getDocumentHistory(path: string) {
    const commits = await this.provider.getCommits({
      owner: this.fs.options.owner,
      repo: this.fs.options.repo,
      path
    });

    return commits.data.map(commit => ({
      sha: commit.sha,
      message: commit.message,
      author: commit.author.name,
      date: commit.author.date,
      htmlUrl: commit.htmlUrl
    }));
  }

  /**
   * 比较文档版本
   */
  async compareVersions(path: string, baseSha: string, headSha: string) {
    const diff = await this.provider.getDiff({
      owner: this.fs.options.owner,
      repo: this.fs.options.repo,
      base: baseSha,
      head: headSha,
      path
    });

    return diff.data.map(file => ({
      filename: file.filename,
      status: file.status,
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      patch: file.patch
    }));
  }

  /**
   * 创建文档模板
   */
  async createTemplate(name: string, content: string) {
    const path = `templates/${name}.md`;
    
    await this.fs.writeFile(path, content, {
      message: `Add document template: ${name}`
    });

    console.log(`✅ Template created: ${path}`);
    return path;
  }

  /**
   * 从模板创建文档
   */
  async createFromTemplate(templateName: string, title: string, variables: Record<string, string>) {
    const templatePath = `templates/${templateName}.md`;
    
    try {
      const templateContent = await this.fs.readFile(templatePath, { 
        owner: this.fs.options.owner,
        repo: this.fs.options.repo,
        encoding: 'utf-8' 
      });
      const templateStr = typeof templateContent === 'string' ? templateContent : new TextDecoder().decode(templateContent);
      const docContent = this.replaceTemplateVariables(templateStr, variables);
      
      const path = `docs/${title}.md`;
      await this.fs.writeFile(path, docContent, {
        message: `Create document from template: ${title}`
      });

      console.log(`✅ Document created from template: ${path}`);
      return path;
    } catch (error) {
      console.error(`❌ Template not found: ${templateName}`);
      throw error;
    }
  }

  /**
   * 获取团队统计信息
   */
  async getTeamStats() {
    const docs = await this.fs.readdir('docs');
    const templates = await this.fs.readdir('templates');
    const prs = await this.getPendingPullRequests();

    return {
      totalDocuments: docs.filter(f => f.type === 'file' && f.name.endsWith('.md')).length,
      totalTemplates: templates.filter(f => f.type === 'file' && f.name.endsWith('.md')).length,
      pendingReviews: prs.length,
      recentActivity: await this.getRecentActivity()
    };
  }

  /**
   * 获取最近活动
   */
  private async getRecentActivity() {
    const commits = await this.provider.getCommits({
      owner: this.fs.options.owner,
      repo: this.fs.options.repo,
      per_page: 10
    });

    return commits.data.map(commit => ({
      sha: commit.sha,
      message: commit.message,
      author: commit.author.name,
      date: commit.author.date,
      htmlUrl: commit.htmlUrl
    }));
  }

  /**
   * 生成文档内容
   */
  private generateDocumentContent(title: string, content: string, author: string): string {
    const timestamp = new Date().toISOString();
    
    return `# ${title}

**Author:** ${author}  
**Created:** ${timestamp}  
**Status:** Draft

---

${content}

---

*This document is managed by TeamDocs collaboration system*
`;
  }

  /**
   * 替换模板变量
   */
  private replaceTemplateVariables(template: string, variables: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    }
    return result;
  }
}

// 使用示例
async function main() {
  const token = process.env.GITHUB_TOKEN || 'your-github-token';
  const owner = 'your-org';
  const repo = 'team-docs';

  const teamDocs = new TeamDocs(token, owner, repo);

  try {
    // 创建文档模板
    const templateContent = `# {{title}}

**Author:** {{author}}  
**Date:** {{date}}  
**Status:** {{status}}

## Overview

{{overview}}

## Details

{{details}}

## Conclusion

{{conclusion}}

---

*Generated from template: {{templateName}}*
`;

    await teamDocs.createTemplate('project-doc', templateContent);

    // 从模板创建文档
    const variables = {
      title: 'API Documentation',
      author: 'John Doe',
      date: new Date().toISOString().split('T')[0],
      status: 'In Progress',
      overview: 'This document describes the API endpoints for our new service.',
      details: 'Detailed API documentation with examples and error codes.',
      conclusion: 'The API is ready for beta testing.',
      templateName: 'project-doc'
    };

    await teamDocs.createFromTemplate('project-doc', 'API-Documentation', variables);

    // 创建文档草稿
    const { branchName } = await teamDocs.createDocumentDraft(
      'User Guide',
      'This is a comprehensive user guide for our application.',
      'jane-smith'
    );

    // 创建拉取请求
    await teamDocs.createPullRequest(
      'User Guide',
      'Add comprehensive user guide for the application.\n\n- Covers all major features\n- Includes screenshots\n- Provides troubleshooting tips',
      branchName
    );

    // 获取待审查的PR
    const pendingPRs = await teamDocs.getPendingPullRequests();
    console.log('📋 Pending reviews:', pendingPRs.length);

    // 获取团队统计
    const stats = await teamDocs.getTeamStats();
    console.log('📊 Team stats:', stats);

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  main();
} 