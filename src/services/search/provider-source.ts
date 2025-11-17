import { FileType } from "@/toolkit/vscode/file-system";
import { spaceHelper } from "@/helpers/space.helper";
import xbook from "xbook/index";

export interface FileReader {
  readDirectory(spaceId: string, path: string): Promise<[string, FileType][]>;
  readFile(spaceId: string, path: string): Promise<Uint8Array>;
  stat?(spaceId: string, path: string): Promise<{ mtime?: number; size?: number }>;
}

export class ProviderSource implements FileReader {
  async readDirectory(spaceId: string, path: string): Promise<[string, FileType][]> {
    const uri = spaceHelper.getUri(spaceId, path);
    return xbook.fs.readDirectory(uri);
  }

  async readFile(spaceId: string, path: string): Promise<Uint8Array> {
    const uri = spaceHelper.getUri(spaceId, path);
    return xbook.fs.readFile(uri);
  }

  async stat(spaceId: string, path: string): Promise<{ mtime?: number; size?: number }> {
    try {
      const uri = spaceHelper.getUri(spaceId, path);
      const s = await xbook.fs.stat(uri);
      return { mtime: s.mtime, size: s.size };
    } catch {
      return {};
    }
  }
}

export const isProbablyBinary = (name: string) => {
  const lower = name.toLowerCase();
  // quick extension blacklist; extend later
  return (
    [
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".webp",
      ".ico",
      ".pdf",
      ".zip",
      ".tar",
      ".gz",
      ".7z",
      ".mp3",
      ".mp4",
      ".mov",
      ".wav",
      ".ttf",
      ".woff",
      ".woff2",
      ".exe",
      ".dll",
    ].some((ext) => lower.endsWith(ext)) || lower.startsWith(".git/")
  );
};

export const shouldIgnorePath = (path: string) => {
  const parts = path.split("/");
  if (parts.some((p) => [".git", "node_modules", ".next", "dist", "build"].includes(p))) return true;
  const name = parts[parts.length - 1];
  if ([".DS_Store", "Thumbs.db"].includes(name)) return true;
  return false;
};

