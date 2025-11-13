import { Github } from "lucide-react";
import { cn } from "@/toolkit/utils/shadcn-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GithubShortcutProps {
  shortcut: {
    id: string;
    name: string;
    icon: string;
  };
  isExpanded: boolean;
}

export default function GithubShortcut({
  shortcut,
  isExpanded,
}: GithubShortcutProps) {
  const content = (
    <div className="flex justify-center">
      <a
        href="https://github.com/Peiiii/dimstack-app-write"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center transition-all duration-300 ease-in-out",
          isExpanded ? "px-3 py-1.5 w-full" : "p-1.5 aspect-square",
          isExpanded ? "rounded-sm" : "rounded-md",
          "hover:bg-accent/80 hover:text-accent-foreground",
          !isExpanded && "justify-center"
        )}
      >
        <Github
          className={cn(
            "flex-shrink-0 transition-all duration-300 ease-in-out",
            isExpanded ? "h-5 w-5" : "h-[22px] w-[22px]",
            "hover:scale-105"
          )}
        />
        {isExpanded && (
          <span className="ml-2.5 text-sm truncate text-muted-foreground animate-in fade-in-0 slide-in-from-left-2 duration-300">
            {shortcut.name}
          </span>
        )}
      </a>
    </div>
  );

  return isExpanded ? (
    content
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={10}
        className="text-xs px-2.5 py-1.5 bg-popover/95 text-popover-foreground rounded-md"
      >
        {shortcut.name}
      </TooltipContent>
    </Tooltip>
  );
}

