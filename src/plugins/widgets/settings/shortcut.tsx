import { componentService } from "xbook/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/toolkit/utils/shadcn-utils";
import QuickSettingsMenu from "./quick-settings-menu";
import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SettingsShortcutProps {
  shortcut: { id: string; icon?: string; name: string };
  isExpanded: boolean;
}

export default function SettingsShortcut({ shortcut, isExpanded }: SettingsShortcutProps) {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [colorMode]);
  const { icon = "AiOutlineSetting", name } = shortcut;
  const displayName = name || t("common.settings");
  const IconComponent = componentService.useComponent(icon);

  const trigger = (
    <div className="flex justify-center">
      <button
        className={cn(
          "flex items-center transition-all duration-300 ease-in-out",
          isExpanded ? "px-3 py-1.5 w-full" : "p-1.5 aspect-square",
          isExpanded ? "rounded-sm" : "rounded-md",
          "hover:bg-accent/80 hover:text-accent-foreground",
          !isExpanded && "justify-center"
        )}
        // prevent default eventBus click handling
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <IconComponent
          className={cn(
            "flex-shrink-0 transition-all duration-300 ease-in-out",
            isExpanded ? "h-5 w-5" : "h-[22px] w-[22px]",
            "hover:scale-105"
          )}
        />
        {isExpanded && (
          <span className="ml-2.5 text-sm truncate text-muted-foreground animate-in fade-in-0 slide-in-from-left-2 duration-300">
            {displayName}
          </span>
        )}
      </button>
    </div>
  );

  const content = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={10} className="min-w-56">
        <QuickSettingsMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return isExpanded ? (
    content
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="text-xs px-2.5 py-1.5 bg-popover/95 text-popover-foreground rounded-md"
        >
          {displayName}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
