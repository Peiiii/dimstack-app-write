import { cn } from "@/toolkit/utils/shadcn-utils";
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DragSortItem } from "xbook/ui/components/DragSort";
import { componentService, eventBus } from "xbook/services";
import { EventKeys } from "@/constants/eventKeys";
import { IActivityItem } from "../types";

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
    <TooltipProvider>
      <div
        className={cn(
          "h-full bg-background border-r flex flex-col transition-all duration-200 ease-in-out",
          isExpanded ? "w-[200px]" : "w-[48px]"
        )}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="my-2 mx-auto hover:bg-accent hover:text-accent-foreground"
          onClick={onToggleExpand}
        >
          {isExpanded ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        {/* Activities Section */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1">
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

        {/* Shortcuts Section */}
        <div className="py-2 space-y-1 border-t">
          {shortcuts.map((shortcut) => (
            <ShortcutItem
              key={shortcut.id}
              shortcut={shortcut}
              isExpanded={isExpanded}
            />
          ))}
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

function ActivityItem({
  activity,
  isActive,
  isExpanded,
  index,
  onMove,
  onClick,
}: ActivityItemProps) {
  const IconComponent = componentService.useComponent(
    activity.icon || "AiOutlineQuestionCircle"
  );

  const content = (
    <button
      className={cn(
        "w-full flex items-center px-3 py-2 rounded-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        !isExpanded && "justify-center"
      )}
      onClick={onClick}
    >
      <IconComponent className="h-5 w-5 flex-shrink-0" />
      {isExpanded && (
        <span className="ml-2 text-sm truncate">{activity.name}</span>
      )}
    </button>
  );

  return (
    <DragSortItem key={activity.id} id={activity.id} index={index} moveItem={onMove}>
      {isExpanded ? (
        content
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            {activity.name}
          </TooltipContent>
        </Tooltip>
      )}
    </DragSortItem>
  );
}

function ShortcutItem({ shortcut, isExpanded }) {
  const IconComponent = componentService.useComponent(
    shortcut.icon || "AiOutlineQuestionCircle"
  );

  const content = (
    <button
      className={cn(
        "w-full flex items-center px-3 py-2 rounded-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        !isExpanded && "justify-center"
      )}
      onClick={() => {
        eventBus.emit(EventKeys.Shortcut.ShortcutClicked(shortcut.id));
      }}
    >
      <IconComponent className="h-5 w-5 flex-shrink-0" />
      {isExpanded && (
        <span className="ml-2 text-sm truncate">{shortcut.name}</span>
      )}
    </button>
  );

  return isExpanded ? (
    content
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={10}>
        {shortcut.name}
      </TooltipContent>
    </Tooltip>
  );
} 