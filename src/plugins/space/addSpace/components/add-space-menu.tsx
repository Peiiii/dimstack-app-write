import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Github, GitBranch, Sparkles, KeyRound, CheckCircle2, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
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

  // Expanded state
  const [githubExpanded, setGithubExpanded] = useState(false);
  const [giteeExpanded, setGiteeExpanded] = useState(false);

  // GitHub repos state
  const [githubRepos, setGithubRepos] = useState<{ value: string; label: string; owner: string }[]>([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubOwner, setGithubOwner] = useState<string>("");

  // Gitee repos state
  const [giteeRepos, setGiteeRepos] = useState<{ value: string; label: string; owner: string }[]>([]);
  const [giteeLoading, setGiteeLoading] = useState(false);
  const [giteeOwner, setGiteeOwner] = useState<string>("");

  // Load GitHub repos when expanded
  useSubscribeObservable(
    () => {
      if (!githubAuthorized || !githubExpanded) return of([]);
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

  // Load Gitee repos when expanded
  useSubscribeObservable(
    () => {
      if (!giteeAuthorized || !giteeExpanded) return of([]);
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

  const handleGithubToggle = () => {
    if (githubAuthorized) {
      setGithubExpanded(!githubExpanded);
    } else {
      handleGitHubAuth();
    }
  };

  const handleGiteeToggle = () => {
    if (giteeAuthorized) {
      setGiteeExpanded(!giteeExpanded);
    } else {
      handleGiteeAuth();
    }
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
        className="w-[320px] p-1"
        sideOffset={6}
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          添加工作空间
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />

        {/* GitHub Section */}
        <div className="space-y-1">
          <DropdownMenuItem
            onClick={handleGithubToggle}
            className="px-2.5 py-2 cursor-pointer group focus:bg-accent/50"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                <Github className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium leading-tight">GitHub</div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {githubAuthorized ? "选择仓库" : "需要授权"}
                </div>
              </div>
              {githubAuthorized ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  {githubLoading ? (
                    <Loader2 className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 animate-spin" />
                  ) : (
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground/60 shrink-0 transition-transform duration-200 ${
                        githubExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </>
              ) : (
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              )}
            </div>
          </DropdownMenuItem>

          {githubAuthorized && githubExpanded && (
            <div className="ml-11 mr-2 border-l border-muted-foreground/20 pl-4">
              <Command className="border-0 bg-transparent p-0">
                <CommandInput
                  placeholder="搜索仓库..."
                  className="h-8 text-xs"
                />
                <CommandList className="max-h-[200px]">
                  <CommandEmpty className="py-4 text-center text-xs">
                    未找到仓库
                  </CommandEmpty>
                  <CommandGroup className="p-0">
                    {githubLoading ? (
                      <div className="py-4 text-center text-xs flex items-center justify-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        加载中...
                      </div>
                    ) : (
                      githubRepos.map((repo) => (
                        <CommandItem
                          key={repo.value}
                          onSelect={() => handleCreateSpace("github", repo.value, repo.owner)}
                          className="cursor-pointer py-2 px-2 text-sm hover:bg-accent/50 rounded-sm"
                        >
                          {repo.label}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>

        {/* Gitee Section */}
        <div className="space-y-1">
          <DropdownMenuItem
            onClick={handleGiteeToggle}
            className="px-2.5 py-2 cursor-pointer group focus:bg-accent/50"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                <GitBranch className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium leading-tight">Gitee</div>
                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {giteeAuthorized ? "选择仓库" : "需要授权"}
                </div>
              </div>
              {giteeAuthorized ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  {giteeLoading ? (
                    <Loader2 className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 animate-spin" />
                  ) : (
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground/60 shrink-0 transition-transform duration-200 ${
                        giteeExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </>
              ) : (
                <KeyRound className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
              )}
            </div>
          </DropdownMenuItem>

          {giteeAuthorized && giteeExpanded && (
            <div className="ml-11 mr-2 border-l border-muted-foreground/20 pl-4">
              <Command className="border-0 bg-transparent p-0">
                <CommandInput
                  placeholder="搜索仓库..."
                  className="h-8 text-xs"
                />
                <CommandList className="max-h-[200px]">
                  <CommandEmpty className="py-4 text-center text-xs">
                    未找到仓库
                  </CommandEmpty>
                  <CommandGroup className="p-0">
                    {giteeLoading ? (
                      <div className="py-4 text-center text-xs flex items-center justify-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        加载中...
                      </div>
                    ) : (
                      giteeRepos.map((repo) => (
                        <CommandItem
                          key={repo.value}
                          onSelect={() => handleCreateSpace("gitee", repo.value, repo.owner)}
                          className="cursor-pointer py-2 px-2 text-sm hover:bg-accent/50 rounded-sm"
                        >
                          {repo.label}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </div>

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

