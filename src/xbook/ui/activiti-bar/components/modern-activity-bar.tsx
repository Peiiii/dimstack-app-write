import { cn } from "@/toolkit/utils/shadcn-utils";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DragSortItem } from "xbook/ui/components/DragSort";
import { componentService, eventBus } from "xbook/services";
import { EventKeys } from "@/constants/eventKeys";
import { IActivityItem } from "../types";
import { BaseActivityItem } from "./base-activity-item";
import * as React from "react";

interface IShortcutItem {
  id: string;
  name: string;
  icon: string;
}

interface ModernActivityBarProps {
  activities: IActivityItem[];
  shortcuts: IShortcutItem[];
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

  return (
    <BaseActivityItem
      activity={{ id: "", name, icon } as IActivityItem}
      isExpanded={isExpanded}
      isActive={isActive}
      onClick={onClick}
      icon={<IconComponent className="w-full h-full" />}
    />
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
