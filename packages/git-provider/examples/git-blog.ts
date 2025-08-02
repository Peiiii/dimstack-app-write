import { GitFileSystem, GitHubProvider } from '../src';

/**
 * 基于Git的博客系统
 * 支持文章发布、版本控制和自动部署
 */
export class GitBlog {
    private provider: GitHubProvider;
    private fs: GitFileSystem;

    constructor(token: string, owner: string, repo: string) {
        this.provider = new GitHubProvider({ token });
        this.fs = new GitFileSystem(this.provider, { owner, repo });
    }

    /**
     * 发布文章
     */
    async publishPost(title: string, content: string, tags: string[] = [], status: 'draft' | 'published' = 'published') {
        const slug = this.generateSlug(title);
        const timestamp = new Date().toISOString();
        const path = `posts/${slug}.md`;

        const postContent = this.generatePostContent(title, content, tags, timestamp, status);

        await this.fs.writeFile(path, postContent, {
            message: `${status === 'published' ? 'Publish' : 'Add draft'}: ${title}`
        });

        console.log(`✅ Post ${status}: ${path}`);
        return { slug, path, timestamp };
    }

    /**
     * 更新文章
     */
    async updatePost(slug: string, content: string, tags: string[] = []) {
        const path = `posts/${slug}.md`;

        try {
            // 获取现有文章内容
            const existingContent = await this.fs.readFile(path, { encoding: 'utf-8' });
            const contentStr = typeof existingContent === 'string' ? existingContent : new TextDecoder().decode(existingContent);
            const updatedContent = this.updatePostContent(contentStr, content, tags);

            await this.fs.writeFile(path, updatedContent, {
                message: `Update post: ${slug}`
            });

            console.log(`✅ Post updated: ${path}`);
            return path;
        } catch (error) {
            console.error(`❌ Post not found: ${slug}`);
            throw error;
        }
    }

    /**
     * 获取文章列表
     */
    async getPosts(status?: 'draft' | 'published') {
        const posts = await this.fs.readdir('posts');
        const postList: Array<{
            slug: string;
            title: string;
            tags: string[];
            status: string;
            date: string;
            excerpt: string;
        }> = [];

        for (const post of posts) {
            if (post.type === 'file' && post.name.endsWith('.md')) {
                try {
                    const content = await this.fs.readFile(`posts/${post.name}`, { encoding: 'utf-8' });
                    const contentStr = typeof content === 'string' ? content : new TextDecoder().decode(content);
                    const metadata = this.extractPostMetadata(contentStr);

                    if (!status || metadata.status === status) {
                        postList.push({
                            slug: post.name.replace('.md', ''),
                            title: metadata.title,
                            tags: metadata.tags,
                            status: metadata.status,
                            date: metadata.date,
                            excerpt: metadata.excerpt
                        });
                    }
                } catch (error) {
                    console.warn(`Warning: Could not read post ${post.name}`);
                }
            }
        }

        // 按日期排序
        return postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    /**
     * 获取单篇文章
     */
    async getPost(slug: string) {
        const path = `posts/${slug}.md`;

        try {
            const content = await this.fs.readFile(path, { encoding: 'utf-8' });
            const contentStr = typeof content === 'string' ? content : new TextDecoder().decode(content);
            const metadata = this.extractPostMetadata(contentStr);

            return {
                slug,
                title: metadata.title,
                content: metadata.content,
                tags: metadata.tags,
                status: metadata.status,
                date: metadata.date,
                excerpt: metadata.excerpt
            };
        } catch (error) {
            console.error(`❌ Post not found: ${slug}`);
            return null;
        }
    }

    /**
     * 获取文章历史版本
     */
    async getPostHistory(slug: string) {
        const path = `posts/${slug}.md`;

        try {
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
        } catch (error) {
            console.log(`No history found for: ${slug}`);
            return [];
        }
    }

    /**
     * 恢复文章到指定版本
     */
    async revertPost(slug: string, commitSha: string) {
        const path = `posts/${slug}.md`;

        try {
            const commit = await this.provider.getCommit({
                owner: this.fs.options.owner,
                repo: this.fs.options.repo,
                sha: commitSha
            });

            // 获取该版本的文件内容
            const fileResponse = await this.provider.getFile({
                owner: this.fs.options.owner,
                repo: this.fs.options.repo,
                path
            });

            await this.fs.writeFile(path, fileResponse.data.content, {
                message: `Revert post to version: ${commitSha.substring(0, 7)}`
            });

            console.log(`✅ Post reverted to version: ${commitSha.substring(0, 7)}`);
            return path;
        } catch (error) {
            console.error(`❌ Failed to revert post: ${error}`);
            throw error;
        }
    }

    /**
     * 搜索文章
     */
    async searchPosts(query: string) {
        const posts = await this.getPosts();
        const results: Array<{
            slug: string;
            title: string;
            content: string;
            tags: string[];
            status: string;
            date: string;
            excerpt: string;
        }> = [];

        for (const post of posts) {
            if (post.status === 'published') {
                const fullPost = await this.getPost(post.slug);
                if (fullPost && (
                    fullPost.title.toLowerCase().includes(query.toLowerCase()) ||
                    fullPost.content.toLowerCase().includes(query.toLowerCase()) ||
                    fullPost.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
                )) {
                    results.push(fullPost);
                }
            }
        }

        return results;
    }

    /**
     * 获取标签云
     */
    async getTagCloud() {
        const posts = await this.getPosts('published');
        const tagCount: Record<string, number> = {};

        for (const post of posts) {
            for (const tag of post.tags) {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            }
        }

        return Object.entries(tagCount)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * 生成站点地图
     */
    async generateSitemap() {
        const posts = await this.getPosts('published');
        const baseUrl = `https://${this.fs.options.owner}.github.io/${this.fs.options.repo}`;
        
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

        for (const post of posts) {
            sitemap += `
  <url>
    <loc>${baseUrl}/posts/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
        }

        sitemap += `
</urlset>`;

        await this.fs.writeFile('sitemap.xml', sitemap, {
            message: 'Update sitemap'
        });

        console.log('✅ Sitemap generated');
        return 'sitemap.xml';
    }

    /**
     * 生成RSS订阅
     */
    async generateRSS() {
        const posts = await this.getPosts('published');
        const baseUrl = `https://${this.fs.options.owner}.github.io/${this.fs.options.repo}`;
        
        let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${this.fs.options.owner}'s Blog</title>
    <link>${baseUrl}</link>
    <description>A blog powered by Git</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`;

        for (const post of posts.slice(0, 20)) { // 最新20篇文章
            rss += `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <guid>${baseUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`;
        }

        rss += `
  </channel>
</rss>`;

        await this.fs.writeFile('rss.xml', rss, {
            message: 'Update RSS feed'
        });

        console.log('✅ RSS feed generated');
        return 'rss.xml';
    }

    /**
     * 生成Slug
     */
    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    /**
     * 生成文章内容
     */
    private generatePostContent(title: string, content: string, tags: string[], timestamp: string, status: string): string {
        const tagString = tags.length > 0 ? tags.join(', ') : '';

        return `---
title: "${title}"
date: "${timestamp}"
tags: [${tagString}]
status: "${status}"
---

${content}

---

*This post was published using GitBlog*
`;
    }

    /**
     * 更新文章内容
     */
    private updatePostContent(existingContent: string, newContent: string, tags: string[]): string {
        const lines = existingContent.split('\n');
        const frontMatterEnd = lines.findIndex(line => line === '---');

        if (frontMatterEnd === -1) {
            return this.generatePostContent('Updated Post', newContent, tags, new Date().toISOString(), 'published');
        }

        const frontMatter = lines.slice(0, frontMatterEnd + 1);
        const tagString = tags.length > 0 ? tags.join(', ') : '';

        // 更新front matter
        const updatedFrontMatter = frontMatter.map(line => {
            if (line.startsWith('tags:')) {
                return `tags: [${tagString}]`;
            }
            if (line.startsWith('date:')) {
                return `date: "${new Date().toISOString()}"`;
            }
            return line;
        });

        return `${updatedFrontMatter.join('\n')}

${newContent}

---

*This post was updated using GitBlog*
`;
    }

    /**
     * 提取文章元数据
     */
    private extractPostMetadata(content: string) {
        const lines = content.split('\n');
        const frontMatterEnd = lines.findIndex(line => line === '---');

        if (frontMatterEnd === -1) {
            return {
                title: 'Untitled',
                tags: [],
                status: 'published',
                date: new Date().toISOString(),
                content: content,
                excerpt: content.substring(0, 200) + '...'
            };
        }

        const frontMatter = lines.slice(1, frontMatterEnd);
        const contentLines = lines.slice(frontMatterEnd + 1);

        const metadata: any = {};
        for (const line of frontMatter) {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                let value = valueParts.join(':').trim();
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                if (key === 'tags') {
                    metadata[key] = value.replace(/[\[\]]/g, '').split(',').map((t: string) => t.trim()).filter(Boolean);
                } else {
                    metadata[key] = value;
                }
            }
        }

        const postContent = contentLines.join('\n').trim();

        return {
            title: metadata.title || 'Untitled',
            tags: metadata.tags || [],
            status: metadata.status || 'published',
            date: metadata.date || new Date().toISOString(),
            content: postContent,
            excerpt: postContent.substring(0, 200) + (postContent.length > 200 ? '...' : '')
        };
    }
}

// 使用示例
async function main() {
    const token = process.env.GITHUB_TOKEN || 'your-github-token';
    const owner = 'your-username';
    const repo = 'blog';

    const blog = new GitBlog(token, owner, repo);

    try {
        // 发布文章
        await blog.publishPost(
            'Getting Started with Git Provider',
            `# Getting Started with Git Provider

The @dimstack/git-provider library provides a unified interface for working with Git repositories across different platforms.

## Features

- Support for GitHub and Gitee
- File system abstraction
- Version control capabilities
- TypeScript support

## Installation

\`\`\`bash
npm install @dimstack/git-provider
\`\`\`

## Usage

\`\`\`typescript
import { GitHubProvider } from '@dimstack/git-provider';

const provider = new GitHubProvider({
  token: 'your-github-token'
});

// Get repository info
const repo = await provider.getRepository({
  owner: 'octocat',
  repo: 'Hello-World'
});
\`\`\`

This library makes it easy to build applications that work with Git repositories programmatically.`,
            ['git', 'typescript', 'api', 'tutorial']
        );

        // 发布草稿
        await blog.publishPost(
            'Advanced Git Operations',
            'This is a draft post about advanced Git operations...',
            ['git', 'advanced'],
            'draft'
        );

        // 获取已发布的文章
        const publishedPosts = await blog.getPosts('published');
        console.log('📝 Published posts:', publishedPosts.length);

        // 搜索文章
        const searchResults = await blog.searchPosts('git');
        console.log('🔍 Search results:', searchResults.length);

        // 获取标签云
        const tagCloud = await blog.getTagCloud();
        console.log('🏷️ Tag cloud:', tagCloud);

        // 生成站点地图和RSS
        await blog.generateSitemap();
        await blog.generateRSS();

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

// 如果直接运行此文件
if (require.main === module) {
    main();
} 