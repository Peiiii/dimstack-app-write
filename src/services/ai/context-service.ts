import { layoutService } from "xbook/services";
import { fileSystemHelper } from "@/helpers/file-system.helper";
import i18n from "@/i18n/config";

export interface BrowserTabContext {
  url: string;
  title: string;
  content?: string;
  selectedText?: string;
}

export interface EditorContext {
  uri: string;
  fileName: string;
  content: string;
  selectedText?: string;
  language?: string;
  lineCount: number;
}

export interface ProjectContext {
  currentFile?: string;
  recentFiles?: string[];
  projectStructure?: string;
}

export interface AIContext {
  browserTab?: BrowserTabContext;
  editor?: EditorContext;
  project?: ProjectContext;
  timestamp: number;
}

export class AIContextService {
  async getCurrentPageContext(): Promise<{ uri?: string; openerId?: string } | undefined> {
    const page = layoutService.pageBox.getCurrentPage?.();
    if (!page) return undefined;
    
    const viewData = page.viewData as { type?: string; props?: { uri?: string } } | undefined;
    const uri = viewData?.props?.uri as string | undefined;
    const openerId = viewData?.type as string | undefined;

    return { uri, openerId };
  }

  async getEditorContext(): Promise<EditorContext | undefined> {
    const pageContext = await this.getCurrentPageContext();
    if (!pageContext?.uri) return undefined;

    const uri = pageContext.uri;
    try {
      const content = await fileSystemHelper.service.read(uri);
      const fileName = uri.split("/").pop() || uri;
      const language = this.detectLanguage(fileName);
      const lines = content.split("\n");

      return {
        uri,
        fileName,
        content,
        language,
        lineCount: lines.length,
      };
    } catch (error) {
      console.warn("Failed to read file for context:", error);
      return undefined;
    }
  }

  async getBrowserTabContext(): Promise<BrowserTabContext | undefined> {
    if (typeof window === "undefined") {
      return undefined;
    }

    const chromeApi = (window as { chrome?: { tabs?: { query: (queryInfo: { active: boolean; currentWindow: boolean }) => Promise<Array<{ url?: string; title?: string }>> } } }).chrome;
    
    if (!chromeApi || !chromeApi.tabs) {
      return undefined;
    }

    try {
      const tabs = await chromeApi.tabs.query({ active: true, currentWindow: true });
      if (tabs.length === 0 || !tabs[0]?.url) return undefined;

      const tab = tabs[0];
      const url = tab.url;
      if (!url) return undefined;

      return {
        url,
        title: tab.title || "",
      };
    } catch (error) {
      console.warn("Failed to get browser tab context:", error);
      return undefined;
    }
  }

  async getFullContext(options?: {
    includeBrowserTab?: boolean;
    includeEditor?: boolean;
    includeProject?: boolean;
  }): Promise<AIContext> {
    const {
      includeBrowserTab = true,
      includeEditor = true,
      includeProject = false,
    } = options || {};

    const context: AIContext = {
      timestamp: Date.now(),
    };

    if (includeBrowserTab) {
      context.browserTab = await this.getBrowserTabContext();
    }

    if (includeEditor) {
      context.editor = await this.getEditorContext();
    }

    if (includeProject) {
      context.project = await this.getProjectContext();
    }

    return context;
  }

  formatContextForPrompt(context: AIContext): string {
    const t = i18n.t.bind(i18n);
    const parts: string[] = [];

    if (context.browserTab) {
      parts.push(`## ${t("globalChat.currentBrowserTab")}`);
      parts.push(`- ${t("globalChat.url")}: ${context.browserTab.url}`);
      parts.push(`- ${t("globalChat.title")}: ${context.browserTab.title}`);
      if (context.browserTab.selectedText) {
        parts.push(`- ${t("globalChat.selectedText")}: ${context.browserTab.selectedText}`);
      }
      parts.push("");
    }

    if (context.editor) {
      parts.push(`## ${t("globalChat.currentEditor")}`);
      parts.push(`- ${t("globalChat.file")}: ${context.editor.fileName}`);
      parts.push(`- ${t("globalChat.path")}: ${context.editor.uri}`);
      if (context.editor.language) {
        parts.push(`- ${t("globalChat.language")}: ${context.editor.language}`);
      }
      parts.push(`- ${t("globalChat.lineCount")}: ${context.editor.lineCount}`);
      if (context.editor.selectedText) {
        parts.push(`- ${t("globalChat.selectedText")}: ${context.editor.selectedText}`);
      }
      parts.push("");
      parts.push(`### ${t("globalChat.fileContent")}`);
      parts.push("```" + (context.editor.language || "") + "\n" + context.editor.content + "\n```");
      parts.push("");
    }

    if (context.project) {
      if (context.project.currentFile) {
        parts.push(`## ${t("globalChat.currentProjectFile")}: ${context.project.currentFile}`);
      }
      if (context.project.recentFiles && context.project.recentFiles.length > 0) {
        parts.push(`## ${t("globalChat.recentFiles")}`);
        context.project.recentFiles.forEach((file) => {
          parts.push(`- ${file}`);
        });
        parts.push("");
      }
    }

    return parts.join("\n");
  }

  private detectLanguage(fileName: string): string {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      ts: "typescript",
      tsx: "typescript",
      js: "javascript",
      jsx: "javascript",
      py: "python",
      java: "java",
      cpp: "cpp",
      c: "c",
      go: "go",
      rs: "rust",
      php: "php",
      rb: "ruby",
      swift: "swift",
      kt: "kotlin",
      md: "markdown",
      json: "json",
      yaml: "yaml",
      yml: "yaml",
      xml: "xml",
      html: "html",
      css: "css",
      scss: "scss",
      sass: "sass",
      sql: "sql",
      sh: "bash",
      bash: "bash",
      zsh: "bash",
    };
    return languageMap[ext || ""] || "text";
  }

  private async getProjectContext(): Promise<ProjectContext> {
    const editorContext = await this.getEditorContext();
    return {
      currentFile: editorContext?.uri,
    };
  }
}

export const aiContextService = new AIContextService();

