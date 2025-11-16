import { cn } from "@/toolkit/utils/shadcn-utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DragSortItem } from "xbook/ui/components/DragSort";
import { componentService, eventBus } from "xbook/services";
import { EventKeys } from "@/constants/eventKeys";
import { IActivityItem } from "../types";
import * as React from "react";

interface ModernActivityBarProps {
  activities: IActivityItem[];
  shortcuts: any[];
  isExpanded: boolean;
  activeId: string;
  onToggleExpand: () => void;
  onActivityClick: (id: string) => void;
  onMoveActivity: (fromIndex: number, toIndex: number) => void;
}

export function ModernActivityBar({
  activities,
  shortcuts,
  isExpanded,
  activeId,
  onToggleExpand,
  onActivityClick,
  onMoveActivity,
}: ModernActivityBarProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <div
        className={cn(
          "h-full bg-background flex flex-col transition-all duration-300 ease-in-out",
          "border-r border-border/40",
          isExpanded ? "w-[140px]" : "w-[52px]"
        )}
      >
        <div className="flex-1 overflow-y-auto py-1">
          {activities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isActive={activity.id === activeId}
              isExpanded={isExpanded}
              index={index}
              onMove={onMoveActivity}
              onClick={() => onActivityClick(activity.id)}
            />
          ))}
        </div>

        <div className="py-1 border-t border-border/40">
          {shortcuts.map((shortcut) => (
            <ShortcutItem
              key={shortcut.id}
              shortcut={shortcut}
              isExpanded={isExpanded}
            />
          ))}
        </div>
        <div className="py-1 border-t border-border/40">
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "my-1 mx-auto hover:bg-accent/50 hover:text-accent-foreground",
                "w-8 h-8 rounded-sm"
              )}
              onClick={onToggleExpand}
            >
              {isExpanded ? (
                <ChevronLeft className="h-3.5 w-3.5" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

interface ActivityItemProps {
  activity: IActivityItem;
  isActive: boolean;
  isExpanded: boolean;
  index: number;
  onMove: (fromIndex: number, toIndex: number) => void;
  onClick: () => void;
}

interface SidebarItemProps {
  icon: string;
  name: string;
  isExpanded: boolean;
  isActive?: boolean;
  onClick: () => void;
}

function SidebarItem({
  icon,
  name,
  isExpanded,
  isActive = false,
  onClick,
}: SidebarItemProps) {
  const IconComponent = componentService.useComponent(
    icon || "AiOutlineQuestionCircle"
  );

  const content = (
    <div className="flex justify-center">
      <button
        className={cn(
          "flex items-center transition-all duration-300 ease-in-out",
          isExpanded ? "px-3 py-1.5 w-full" : "p-1.5 aspect-square",
          isExpanded ? "rounded-sm" : "rounded-md",
          "hover:bg-accent/80 hover:text-accent-foreground",
          isActive &&
            cn(
              "bg-accent/60 text-accent-foreground",
              !isExpanded && "shadow-sm ring-2 ring-accent/20"
            ),
          !isExpanded && "justify-center"
        )}
        // Prevent focus on pointer click so Tooltip won't open by focus.
        // Keyboard users (Tab) still focus normally.
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
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
            {name}
          </span>
        )}
      </button>
    </div>
  );

  return isExpanded ? content : (
    <Tooltip disableHoverableContent>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent
        side="right"
        sideOffset={10}
        className="text-xs px-2.5 py-1.5 bg-popover/95 text-popover-foreground rounded-md"
      >
        {name}
      </TooltipContent>
    </Tooltip>
  );
}

// end

function ActivityItem({
  activity,
  isActive,
  isExpanded,
  index,
  onMove,
  onClick,
}: ActivityItemProps) {
  const CustomComponent = componentService.useComponent(`activity:${activity.id}`);
  
  if (CustomComponent) {
    return (
      <DragSortItem
        key={activity.id}
        id={activity.id}
        index={index}
        moveItem={onMove}
      >
        <CustomComponent activity={activity} isExpanded={isExpanded} />
      </DragSortItem>
    );
  }

  return (
    <DragSortItem
      key={activity.id}
      id={activity.id}
      index={index}
      moveItem={onMove}
    >
      <SidebarItem
        icon={activity.icon}
        name={activity.name}
        isExpanded={isExpanded}
        isActive={isActive}
        onClick={onClick}
      />
    </DragSortItem>
  );
}

function ShortcutItem({ shortcut, isExpanded }) {
  const CustomComponent = componentService.useComponent(`shortcut:${shortcut.id}`);
  if (CustomComponent) {
    return <CustomComponent shortcut={shortcut} isExpanded={isExpanded} />;
  }
  return (
    <SidebarItem
      icon={shortcut.icon}
      name={shortcut.name}
      isExpanded={isExpanded}
      onClick={() => {
        eventBus.emit(EventKeys.Shortcut.ShortcutClicked(shortcut.id));
      }}
    />
  );
}
