import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Github, GitBranch, Sparkles, KeyRound, CheckCircle2, ChevronRight } from "lucide-react";
import { authService } from "@/services/auth.service";
import { spaceService } from "@/services/space.service";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import xbook from "xbook";
import { EventKeys } from "@/constants/eventKeys";
import { useState } from "react";
import { from, map, of } from "rxjs";
import { useSubscribeObservable } from "@/hooks/use-subscribe-observable";

interface AddSpaceMenuProps {
  children: React.ReactNode;
}

const getPlatformRepos = (platform: string) => {
  const accessToken = authService.getAnyAuthInfo(platform)?.accessToken;
  if (!accessToken) return of([]);
  if (platform === "gitee") {
    const promise = createGiteeClient({
      getAccessToken: () => accessToken,
    }).Repo.getList({});
    return from(promise).pipe(map((res) => res.data));
  } else if (platform.toLowerCase() === "github") {
    const promise = createGithubClient({
      getAccessToken: () => accessToken,
    }).Repo.getList({ per_page: 100 });
    return from(promise).pipe(map((res) => res.data));
  }
  return of([]);
};

export const AddSpaceMenu = ({ children }: AddSpaceMenuProps) => {
  authService.useAuthRecords();
  const githubAuthorized = !!authService.getAnyAuthInfo("github")?.accessToken;
  const giteeAuthorized = !!authService.getAnyAuthInfo("gitee")?.accessToken;

  // GitHub repos state
  const [githubRepos, setGithubRepos] = useState<{ value: string; label: string; owner: string }[]>([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubOwner, setGithubOwner] = useState<string>("");

  // Gitee repos state
  const [giteeRepos, setGiteeRepos] = useState<{ value: string; label: string; owner: string }[]>([]);
  const [giteeLoading, setGiteeLoading] = useState(false);
  const [giteeOwner, setGiteeOwner] = useState<string>("");

  // Load GitHub repos
  useSubscribeObservable(
    () => {
      if (!githubAuthorized) return of([]);
      setGithubLoading(true);
      return getPlatformRepos("github");
    },
    (data) => {
      setGithubLoading(false);
      if (data && data.length > 0) {
        setGithubOwner(data[0]?.owner?.name || data[0].owner.login || "");
        setGithubRepos(
          data.map((d) => ({
            value: d.name,
            label: d.name,
            owner: data[0]?.owner?.name || data[0].owner.login || "",
          }))
        );
      } else {
        setGithubRepos([]);
      }
    }
  );

  // Load Gitee repos
  useSubscribeObservable(
    () => {
      if (!giteeAuthorized) return of([]);
      setGiteeLoading(true);
      return getPlatformRepos("gitee");
    },
    (data) => {
      setGiteeLoading(false);
      if (data && data.length > 0) {
        setGiteeOwner(data[0]?.owner?.name || data[0].owner.login || "");
        setGiteeRepos(
          data.map((d) => ({
            value: d.name,
            label: d.name,
            owner: data[0]?.owner?.name || data[0].owner.login || "",
          }))
        );
      } else {
        setGiteeRepos([]);
      }
    }
  );

  const handleCreateSpace = async (platform: string, repo: string, owner: string) => {
    try {
      spaceService.addSpace(
        {
          platform,
          owner,
          repo: repo.toLowerCase(),
        },
        {
          focus: true,
        }
      );
      xbook.notificationService.success("工作空间添加成功");
    } catch {
      xbook.notificationService.error("添加失败，请重试");
    }
  };

  const handleGitHubAuth = () => {
    xbook.eventBus.emit(EventKeys.RequestAuthManage);
  };

  const handleGiteeAuth = () => {
    xbook.eventBus.emit(EventKeys.RequestAuthManage);
  };

  const handleLocal = async () => {
    const defaultSpaceInfo = { platform: "idb", owner: "root", repo: "home" };
    try {
      const existing = spaceService.getSpaceByInfo(defaultSpaceInfo);
      const space = existing
        ? existing
        : spaceService.addSpace(defaultSpaceInfo, { focus: true, silent: true });

      spaceService.focusSpace(space.id);

      try {
        await import("@/services/opener.service").then(({ openerService }) =>
          openerService.open(space.id, {
            id: space.id + "/README.md",
            name: "README.md",
            path: "/README.md",
            type: "file",
          })
        );
      } catch {
        xbook.notificationService.info("已创建本地空间，可在左侧选择文件开始编辑");
      }
    } catch {
      xbook.notificationService.error("创建本地空间失败，请重试");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="right"
        className="w-[280px] p-1"
        sideOffset={6}
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          添加工作空间
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />

        {githubAuthorized ? (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="px-2.5 py-2 cursor-pointer group">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                  <Github className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-tight">GitHub</div>
                  <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    选择仓库
                  </div>
                </div>
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-[320px] p-0" sideOffset={2}>
              <Command>
                <CommandInput placeholder="搜索 GitHub 仓库..." />
                <CommandList>
                  <CommandEmpty>未找到仓库</CommandEmpty>
                  <CommandGroup>
                    {githubLoading ? (
                      <div className="py-6 text-center text-sm">加载中...</div>
                    ) : (
                      githubRepos.map((repo) => (
                        <CommandItem
                          key={repo.value}
                          onSelect={() => handleCreateSpace("github", repo.value, repo.owner)}
                          className="cursor-pointer"
                        >
                          {repo.label}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem
            onClick={handleGitHubAuth}
            className="px-2.5 py-2 cursor-pointer group"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                <Github className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium leading-tight">GitHub</div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  需要授权
                </div>
              </div>
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            </div>
          </DropdownMenuItem>
        )}

        {giteeAuthorized ? (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="px-2.5 py-2 cursor-pointer group">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                  <GitBranch className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-tight">Gitee</div>
                  <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    选择仓库
                  </div>
                </div>
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-[320px] p-0" sideOffset={2}>
              <Command>
                <CommandInput placeholder="搜索 Gitee 仓库..." />
                <CommandList>
                  <CommandEmpty>未找到仓库</CommandEmpty>
                  <CommandGroup>
                    {giteeLoading ? (
                      <div className="py-6 text-center text-sm">加载中...</div>
                    ) : (
                      giteeRepos.map((repo) => (
                        <CommandItem
                          key={repo.value}
                          onSelect={() => handleCreateSpace("gitee", repo.value, repo.owner)}
                          className="cursor-pointer"
                        >
                          {repo.label}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem
            onClick={handleGiteeAuth}
            className="px-2.5 py-2 cursor-pointer group"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                <GitBranch className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium leading-tight">Gitee</div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  需要授权
                </div>
              </div>
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onClick={handleLocal}
          className="px-2.5 py-2 cursor-pointer group"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-tight">本地开始</div>
              <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                无需登录
              </div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

