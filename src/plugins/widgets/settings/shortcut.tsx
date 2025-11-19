import { componentService } from "xbook/services";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BaseActivityItem } from "xbook/ui/activiti-bar/components/base-activity-item";
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

  const baseItem = (
    <BaseActivityItem
      activity={{ id: shortcut.id, name: displayName, icon } as any}
      isExpanded={isExpanded}
      icon={<IconComponent className="w-full h-full" />}
      className="data-[state=open]:pointer-events-none"
      disableTooltip={!isExpanded}
      asChild={true}
    />
  );

  if (isExpanded) {
    return (
      <div className="flex justify-center">
        <SettingsMenu>
          <div className="flex justify-center w-full">{baseItem}</div>
        </SettingsMenu>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Tooltip disableHoverableContent>
        <SettingsMenu>
          <TooltipTrigger asChild>
            <div className="flex justify-center">{baseItem}</div>
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
