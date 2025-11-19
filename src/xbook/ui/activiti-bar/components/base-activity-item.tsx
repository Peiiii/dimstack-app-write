import { cn } from "@/toolkit/utils/shadcn-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IActivityItem } from "xbook/ui/activiti-bar/types";
import { ReactNode } from "react";

interface BaseActivityItemProps {
  activity: IActivityItem;
  isExpanded: boolean;
  isActive?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  children?: ReactNode;
  tooltipContent?: ReactNode;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  disableTooltip?: boolean;
  asChild?: boolean;
}

export function BaseActivityItem({
  activity,
  isExpanded,
  isActive = false,
  onClick,
  icon,
  children,
  tooltipContent,
  className,
  iconClassName,
  textClassName,
  disableTooltip = false,
  asChild = false,
}: BaseActivityItemProps) {
  const buttonElement = (
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
        !isExpanded && "justify-center",
        className
      )}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      {icon && (
        <div
          className={cn(
            "flex-shrink-0 transition-all duration-300 ease-in-out",
            isExpanded ? "h-5 w-5" : "h-[22px] w-[22px]",
            "hover:scale-105",
            iconClassName
          )}
        >
          {icon}
        </div>
      )}
      {children}
      {isExpanded && activity.name && (
        <span
          className={cn(
            "ml-2.5 text-sm truncate text-muted-foreground animate-in fade-in-0 slide-in-from-left-2 duration-300",
            textClassName
          )}
        >
          {activity.name}
        </span>
        )}
      </button>
    );

  const button = buttonElement;

  const content = asChild ? button : (
    <div className="flex justify-center">{button}</div>
  );

  const tooltip = tooltipContent ?? activity.name;

  if (isExpanded || disableTooltip) {
    return content;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip disableHoverableContent>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="text-xs px-2.5 py-1.5 bg-popover/95 text-popover-foreground rounded-md"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

