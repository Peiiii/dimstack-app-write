import {
  AiFillCode,
  AiFillFile,
  AiFillFileMarkdown,
  AiFillFileText,
  AiFillHtml5,
} from "react-icons/ai";
import {
  SiCss3,
  SiGo,
  SiJavascript,
  SiPython,
  SiRust,
  SiTypescript,
} from "react-icons/si";

export interface FileTypeConfig {
  extensions: string[];
  icon: any;
  color: string;
}

export const FILE_TYPES: Record<string, FileTypeConfig> = {
  markdown: {
    extensions: [".md", ".markdown"],
    icon: AiFillFileMarkdown,
    color: "#14668b",
  },
  json: {
    extensions: [".json"],
    icon: AiFillFileText,
    color: "#8b6914",
  },
  typescript: {
    extensions: [".ts", ".tsx"],
    icon: SiTypescript,
    color: "#3178c6",
  },
  javascript: {
    extensions: [".js", ".jsx", ".mjs"],
    icon: SiJavascript,
    color: "#997e1a",
  },
  html: {
    extensions: [".html", ".htm"],
    icon: AiFillHtml5,
    color: "#e34c26",
  },
  css: {
    extensions: [".css", ".scss", ".sass", ".less"],
    icon: SiCss3,
    color: "#264de4",
  },
  python: {
    extensions: [".py", ".pyw", ".pyc"],
    icon: SiPython,
    color: "#3776ab",
  },
  rust: {
    extensions: [".rs"],
    icon: SiRust,
    color: "#dea584",
  },
  go: {
    extensions: [".go"],
    icon: SiGo,
    color: "#00add8",
  },
  config: {
    extensions: [".yml", ".yaml", ".toml", ".ini", ".conf", ".config"],
    icon: AiFillCode,
    color: "#6e6e6e",
  },
  default: {
    extensions: [],
    icon: AiFillFile,
    color: "var(--secondary-color)",
  },
};

export const getFileTypeByExtension = (filename: string): FileTypeConfig => {
  const extension = `.${filename.split(".").pop()?.toLowerCase()}`;

  for (const [, config] of Object.entries(FILE_TYPES)) {
    if (config.extensions.includes(extension)) {
      return config;
    }
  }

  return FILE_TYPES.default;
};
