import { componentService } from "xbook/services";
import { IActivityItem } from "xbook/ui/activiti-bar/types";
import { AddSpaceMenu } from "./add-space-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/toolkit/utils/shadcn-utils";

interface AddSpaceActivityItemProps {
  activity: IActivityItem;
  isExpanded: boolean;
}

export const AddSpaceActivityItem = ({
  activity,
  isExpanded,
}: AddSpaceActivityItemProps) => {
  const { icon = "AiOutlinePlusCircle", name } = activity;
  const IconComponent = componentService.useComponent(icon);

  const ButtonEl = (
    <button
      className={cn(
        "flex items-center transition-all duration-300 ease-in-out",
        isExpanded ? "px-3 py-1.5 w-full" : "p-1.5 aspect-square",
        isExpanded ? "rounded-sm" : "rounded-md",
        "hover:bg-accent/80 hover:text-accent-foreground",
        "data-[state=open]:pointer-events-none",
        !isExpanded && "justify-center"
      )}
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
          {name}
        </span>
      )}
    </button>
  );

  if (isExpanded) {
    return (
      <div className="flex justify-center">
        <AddSpaceMenu>
          <div className="flex justify-center w-full">{ButtonEl}</div>
        </AddSpaceMenu>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Tooltip disableHoverableContent>
        <AddSpaceMenu>
          <TooltipTrigger asChild>
            <div className="flex justify-center">{ButtonEl}</div>
          </TooltipTrigger>
        </AddSpaceMenu>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="text-xs px-2.5 py-1.5 bg-popover/95 text-popover-foreground rounded-md"
        >
          {name}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
