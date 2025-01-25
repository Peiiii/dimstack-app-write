import { FileSystemProvider } from "@/toolkit/vscode/file-system";

export interface SpacePlatformConfig {
  id: string;  // platform唯一标识
  name: string; // 显示名称
  icon?: string; // 平台图标
  hostname?: string; // URL解析用的域名
  getProvider: (options: {
    accessToken?: string;
    owner: string;
    repo: string;
  }) => FileSystemProvider;
}

class SpacePlatformRegistry {
  private platforms = new Map<string, SpacePlatformConfig>();

  register(config: SpacePlatformConfig) {
    this.platforms.set(config.id, config);
  }

  getPlatform(id: string) {
    return this.platforms.get(id);
  }

  getPlatforms() {
    return Array.from(this.platforms.values());
  }
}

export const spacePlatformRegistry = new SpacePlatformRegistry(); 