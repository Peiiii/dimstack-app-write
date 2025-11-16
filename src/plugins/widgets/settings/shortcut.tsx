import { componentService } from "xbook/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/toolkit/utils/shadcn-utils";
import QuickSettingsMenu from "./quick-settings-menu";
import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import React from "react";

interface SettingsShortcutProps {
  shortcut: { id: string; icon?: string; name: string };
  isExpanded: boolean;
}

const SettingsMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={10} className="min-w-56">
        <QuickSettingsMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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

  const ButtonEl = (
    <button
      className={cn(
        "flex items-center transition-all duration-300 ease-in-out",
        isExpanded ? "px-3 py-1.5 w-full" : "p-1.5 aspect-square",
        isExpanded ? "rounded-sm" : "rounded-md",
        "hover:bg-accent/80 hover:text-accent-foreground",
        // When dropdown is open, Radix sets data-state=open on the trigger.
        // Disable pointer events to avoid hover/focus races with tooltip while menu is open.
        "data-[state=open]:pointer-events-none",
        !isExpanded && "justify-center"
      )}
      // Prevent focus on mouse click to avoid Tooltip opening by focus.
      // Keeps keyboard accessibility intact.
      onMouseDown={(e) => e.preventDefault()}
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
  );

  if (isExpanded) {
    return (
      <div className="flex justify-center">
        <SettingsMenu>
          <div className="flex justify-center w-full">{ButtonEl}</div>
        </SettingsMenu>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Tooltip disableHoverableContent>
        <SettingsMenu>
          <TooltipTrigger asChild>
            <div className="flex justify-center">{ButtonEl}</div>
          </TooltipTrigger>
        </SettingsMenu>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="text-xs px-2.5 py-1.5 bg-popover/95 text-popover-foreground rounded-md"
        >
          {displayName}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
