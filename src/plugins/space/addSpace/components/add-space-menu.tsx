import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/services/auth.service";
import { spaceService } from "@/services/space.service";
import { createGiteeClient } from "libs/gitee-api";
import { createGithubClient } from "libs/github-api";
import { ChevronDown, ChevronRight, GitBranch, Github, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { from, map, of } from "rxjs";
import xbook from "xbook";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    authService.useAuthRecords();
    const { authProviders } = authService.useAuthProviders();
    const githubAuthorized = !!authService.getAnyAuthInfo("github")?.accessToken;
    const giteeAuthorized = !!authService.getAnyAuthInfo("gitee")?.accessToken;
    
    const githubProvider = authProviders.find((p) => p.platform === "github");
    const giteeProvider = authProviders.find((p) => p.platform === "gitee");

    // Expanded state
    const [githubExpanded, setGithubExpanded] = useState(false);
    const [giteeExpanded, setGiteeExpanded] = useState(false);

    // GitHub repos state
    const [githubRepos, setGithubRepos] = useState<{ value: string; label: string; owner: string }[]>([]);
    const [githubLoading, setGithubLoading] = useState(false);

    // Gitee repos state
    const [giteeRepos, setGiteeRepos] = useState<{ value: string; label: string; owner: string }[]>([]);
    const [giteeLoading, setGiteeLoading] = useState(false);

    // Load GitHub repos when expanded
    useEffect(() => {
        if (githubAuthorized && githubExpanded && githubRepos.length === 0) {
            setGithubLoading(true);
            const subscription = getPlatformRepos("github").subscribe({
                next: (data) => {
                    setGithubLoading(false);
                    if (data && data.length > 0) {
                        setGithubRepos(
                            data.map((d) => ({
                                value: d.name,
                                label: d.name,
                                owner: d.owner?.login || d.owner?.name || "",
                            }))
                        );
                    } else {
                        setGithubRepos([]);
                    }
                },
                error: (error) => {
                    console.error("Failed to load GitHub repos:", error);
                    setGithubLoading(false);
                    setGithubRepos([]);
                }
            });

            return () => subscription.unsubscribe();
        }
    }, [githubAuthorized, githubExpanded, githubRepos.length]);

    // Load Gitee repos when expanded
    useEffect(() => {
        if (giteeAuthorized && giteeExpanded && giteeRepos.length === 0) {
            setGiteeLoading(true);
            const subscription = getPlatformRepos("gitee").subscribe({
                next: (data) => {
                    setGiteeLoading(false);
                    if (data && data.length > 0) {
                        setGiteeRepos(
                            data.map((d) => ({
                                value: d.name,
                                label: d.name,
                                owner: d.owner?.login || d.owner?.name || "",
                            }))
                        );
                    } else {
                        setGiteeRepos([]);
                    }
                },
                error: (error) => {
                    console.error("Failed to load Gitee repos:", error);
                    setGiteeLoading(false);
                    setGiteeRepos([]);
                }
            });

            return () => subscription.unsubscribe();
        }
    }, [giteeAuthorized, giteeExpanded, giteeRepos.length]);

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
            xbook.notificationService.success(t("space.workspaceAdded"));
        } catch {
            xbook.notificationService.error(t("space.addFailed"));
        }
    };

    const handleGitHubAuth = async () => {
        if (githubProvider) {
            await githubProvider.authenticate({
                needConfirm: false,
            });
        }
    };

    const handleGiteeAuth = async () => {
        if (giteeProvider) {
            await giteeProvider.authenticate({
                needConfirm: false,
            });
        }
    };

    const handleGithubToggle = (event: React.MouseEvent) => {
        event.preventDefault();
        if (githubAuthorized) {
            setGithubExpanded(!githubExpanded);
        } else {
            handleGitHubAuth();
        }
    };

    const handleGiteeToggle = (event: React.MouseEvent) => {
        event.preventDefault();
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
                xbook.notificationService.info(t("space.localSpaceCreated"));
            }
        } catch {
            xbook.notificationService.error(t("space.createLocalSpaceFailed"));
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
                    {t("space.addWorkspace")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />

                {/* GitHub Section */}
                <div className="space-y-1">
                    <DropdownMenuItem
                        onClick={handleGithubToggle}
                        className="px-2.5 py-2 cursor-pointer group focus:bg-accent/50"
                        onSelect={(event) => event.preventDefault()}
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                                <Github className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium leading-tight">GitHub</div>
                                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                                    {githubAuthorized ? t("space.selectRepository") : t("space.needAuthorization")}
                                </div>
                            </div>
                            {githubAuthorized ? (
                                githubLoading ? (
                                    <Loader2 className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 animate-spin" />
                                ) : githubExpanded ? (
                                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                                ) : (
                                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                                )
                            ) : (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                    <span>{t("space.goAuthorize")}</span>
                                    <ArrowRight className="h-3 w-3" />
                                </div>
                            )}
                        </div>
                    </DropdownMenuItem>

                    {githubAuthorized && githubExpanded && (
                        <div className="ml-6 mr-1 mb-1 rounded-md bg-muted/50 p-2">
                            <Command className="bg-transparent">
                                <CommandInput
                                    placeholder={t("space.searchRepository")}
                                    className="h-8 text-sm border-0 focus:ring-0 bg-transparent"
                                />
                                <CommandList className="max-h-[240px]">
                                    <CommandGroup className="p-0">
                                        {githubLoading ? (
                                            <div className="py-4 text-center text-xs flex items-center justify-center gap-2 text-muted-foreground">
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                {t("space.loading")}
                                            </div>
                                        ) : githubRepos.length === 0 ? (
                                            <div className="py-4 text-center text-xs text-muted-foreground">
                                                {t("space.noRepository")}
                                            </div>
                                        ) : (
                                            githubRepos.map((repo) => (
                                                <CommandItem
                                                    key={repo.value}
                                                    onSelect={() => handleCreateSpace("github", repo.value, repo.owner)}
                                                    className="cursor-pointer px-2 py-1.5 rounded-sm text-sm"
                                                >
                                                    {repo.label}
                                                </CommandItem>
                                            ))
                                        )}
                                    </CommandGroup>
                                    {!githubLoading && githubRepos.length > 0 && (
                                        <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">
                                            {t("space.notFound")}
                                        </CommandEmpty>
                                    )}
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
                        onSelect={(event) => event.preventDefault()}
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                                <GitBranch className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium leading-tight">Gitee</div>
                                <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                                    {giteeAuthorized ? t("space.selectRepository") : t("space.needAuthorization")}
                                </div>
                            </div>
                            {giteeAuthorized ? (
                                giteeLoading ? (
                                    <Loader2 className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 animate-spin" />
                                ) : giteeExpanded ? (
                                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                                ) : (
                                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                                )
                            ) : (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                    <span>{t("space.goAuthorize")}</span>
                                    <ArrowRight className="h-3 w-3" />
                                </div>
                            )}
                        </div>
                    </DropdownMenuItem>

                    {giteeAuthorized && giteeExpanded && (
                        <div className="ml-6 mr-1 mb-1 rounded-md bg-muted/50 p-2">
                            <Command className="bg-transparent">
                                <CommandInput
                                    placeholder={t("space.searchRepository")}
                                    className="h-8 text-sm border-0 focus:ring-0 bg-transparent"
                                />
                                <CommandList className="max-h-[240px]">
                                    <CommandGroup className="p-0">
                                        {giteeLoading ? (
                                            <div className="py-4 text-center text-xs flex items-center justify-center gap-2 text-muted-foreground">
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                {t("space.loading")}
                                            </div>
                                        ) : giteeRepos.length === 0 ? (
                                            <div className="py-4 text-center text-xs text-muted-foreground">
                                                {t("space.noRepository")}
                                            </div>
                                        ) : (
                                            giteeRepos.map((repo) => (
                                                <CommandItem
                                                    key={repo.value}
                                                    onSelect={() => handleCreateSpace("gitee", repo.value, repo.owner)}
                                                    className="cursor-pointer px-2 py-1.5 rounded-sm text-sm"
                                                >
                                                    {repo.label}
                                                </CommandItem>
                                            ))
                                        )}
                                    </CommandGroup>
                                    {!giteeLoading && giteeRepos.length > 0 && (
                                        <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">
                                            {t("space.notFound")}
                                        </CommandEmpty>
                                    )}
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
                            <div className="text-sm font-medium leading-tight">{t("space.localStart")}</div>
                            <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                                {t("space.noLoginRequired")}
                            </div>
                        </div>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

