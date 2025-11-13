import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, GitBranch, Sparkles, KeyRound, CheckCircle2 } from "lucide-react";
import { authService } from "@/services/auth.service";
import xbook from "xbook";
import { AddSpaceDialog } from "./add-space-diaglog";

interface AddSpaceMenuProps {
  children: React.ReactNode;
}

export const AddSpaceMenu = ({ children }: AddSpaceMenuProps) => {
  authService.useAuthRecords();
  const githubAuthorized = !!authService.getAnyAuthInfo("github")?.accessToken;
  const giteeAuthorized = !!authService.getAnyAuthInfo("gitee")?.accessToken;

  const handleGitHub = () => {
    xbook.modalService.open({
      title: "",
      width: "420px",
      content: <AddSpaceDialog defaultPlatform="github" />,
      footer: false,
      modalContentClassName: "!p-8",
    });
  };

  const handleGitee = () => {
    xbook.modalService.open({
      title: "",
      width: "420px",
      content: <AddSpaceDialog defaultPlatform="gitee" />,
      footer: false,
      modalContentClassName: "!p-8",
    });
  };

  const handleLocal = () => {
    xbook.modalService.open({
      title: "",
      width: "420px",
      content: <AddSpaceDialog defaultMode="local" />,
      footer: false,
      modalContentClassName: "!p-8",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        side="right"
        className="w-[240px] p-1"
        sideOffset={6}
      >
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          添加工作空间
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onClick={handleGitHub}
          className="px-2.5 py-2 cursor-pointer group"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
              <Github className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-tight">GitHub</div>
              <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                {githubAuthorized ? "已授权" : "需要授权"}
              </div>
            </div>
            {githubAuthorized ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
            ) : (
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            )}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleGitee}
          className="px-2.5 py-2 cursor-pointer group"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
              <GitBranch className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium leading-tight">Gitee</div>
              <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                {giteeAuthorized ? "已授权" : "需要授权"}
              </div>
            </div>
            {giteeAuthorized ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
            ) : (
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
            )}
          </div>
        </DropdownMenuItem>
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

