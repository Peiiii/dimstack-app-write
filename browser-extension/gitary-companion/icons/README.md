# Gitary Companion 图标规范

本目录用于存放浏览器扩展所需的 PNG 图标文件。  
`manifest.json` 中已约定以下文件名：

- `icon16.png`  – 工具栏小图标
- `icon32.png`  – 高分屏/某些界面使用
- `icon48.png`  – 管理界面展示
- `icon128.png` – Chrome Web Store 展示图标

推荐做法：

- 统一设计一套图标（例如一个带有 “G” 的圆形或方形 Logo）。
- 以 512×512 或 1024×1024 的原图为基础，在设计工具中导出上述 4 个尺寸。
- 背景透明的 PNG，避免在深色/浅色主题下出现底色块。

构建时，这些文件会被自动复制到：

- `browser-extension/gitary-companion/extension-dist/icons/`

如果你还没有最终图标，可以先放一套临时占位图，后续替换即可。

