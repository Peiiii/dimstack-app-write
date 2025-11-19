# Gitary Companion 浏览器扩展

在浏览器中一键将 GitHub 仓库打开到 Gitary（`gitary.app`）。

## 功能

- 在 GitHub 仓库页面点击扩展图标，即可在 Gitary 中打开对应仓库。
- 在 GitHub 页面或仓库链接上右键，选择「在 Gitary 中打开此仓库」。

## 目录结构

- `manifest.json`：Chrome 扩展清单（MV3）。
- `src/`：TypeScript 源码
  - `config.ts`：基础配置（例如 Gitary 地址）。
  - `github.ts`：与 GitHub URL 解析相关的纯函数。
  - `gitary.ts`：根据仓库信息构造 Gitary 的跳转链接。
  - `background.ts`：后台 Service Worker，注册点击事件和右键菜单。
- `extension-dist/`：构建产物（由 `tsc` 生成 JS，并复制 `manifest.json`）。

## 本地开发与构建

```bash
cd browser-extension/gitary-companion
pnpm install      # 或 npm install / yarn
pnpm run build
```

构建完成后，会在 `extension-dist/` 目录生成：

- `background.js`
- `manifest.json`

## 在 Chrome 中加载

1. 打开 `chrome://extensions/`。
2. 打开右上角「开发者模式」。
3. 点击「加载已解压的扩展程序」。
4. 选择 `browser-extension/gitary-companion/extension-dist` 目录。

## Chrome Web Store 上架建议文案

- 扩展名称（Name）：
  - Gitary Companion
- 简短描述（Short description，最多 132 字符）：
  - 在浏览器中一键将 GitHub 仓库打开到 Gitary，享受更强大的代码阅读与笔记体验。
- 详细描述（Store listing description，可多段落）：

> Gitary Companion 让你在浏览器中快速将 GitHub 仓库打开到 Gitary（原 GitNote），获得更专业的代码阅读与知识管理体验。  
>  
> 主要功能：  
> - 一键跳转：在 GitHub 仓库页面点击扩展图标，即可在 Gitary 中打开对应仓库。  
> - 右键打开：在 GitHub 页面或仓库链接上右键，选择「在 Gitary 中打开此仓库」。  
> - 自动识别仓库：智能解析 GitHub 仓库地址，仅在支持的页面生效。  
>  
> 权限说明：  
> - tabs / activeTab：用于读取当前标签页 URL，以构造跳转到 Gitary 的链接。  
> - contextMenus：用于在页面和链接上提供右键「在 Gitary 中打开此仓库」菜单。  
>  
> 隐私与数据：  
> - 本扩展不收集、不存储任何个人数据或代码内容。  
> - 所有操作均在本地完成，仅根据当前页面/链接的 URL 构造跳转链接。

## 图标文件说明

`manifest.json` 中预留了以下图标路径（请自行放置 PNG 文件）：

- `icons/icon16.png`
- `icons/icon32.png`
- `icons/icon48.png`
- `icons/icon128.png`

建议使用同一图标的不同尺寸版本，背景透明，方便在工具栏和商店页面显示。

## 调整 Gitary 地址

当前扩展默认跳转到：

```ts
// src/config.ts
export const DEFAULT_APP_BASE_URL = "https://gitary.app";
```

扩展支持多个域名，当前配置包括：
- `https://gitary.app`（默认）
- `https://write.dimstack.com`

如果你在本地开发 Gitary，可以修改 `DEFAULT_APP_BASE_URL` 为：

```ts
export const DEFAULT_APP_BASE_URL = "http://localhost:5173";
```

修改后重新执行：

```bash
pnpm run build
```

然后在 Chrome 扩展页点击「重新加载」即可。
