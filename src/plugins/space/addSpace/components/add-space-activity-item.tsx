import { componentService } from "xbook/services";
import { IActivityItem } from "xbook/ui/activiti-bar/types";
import { AddSpaceMenu } from "./add-space-menu";
import { cn } from "@/toolkit/utils/shadcn-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AddSpaceActivityItemProps {
  activity: IActivityItem;
  isExpanded: boolean;
}

export const AddSpaceActivityItem = ({ activity, isExpanded }: AddSpaceActivityItemProps) => {
  const { icon = "AiOutlinePlusCircle", name } = activity;
  const IconComponent = componentService.useComponent(icon);

  const content = (
    <div className="flex justify-center">
      <AddSpaceMenu>
        <button
          className={cn(
            "flex items-center transition-all duration-150",
            isExpanded ? "px-3 py-1.5 w-full" : "p-1.5 aspect-square",
            isExpanded ? "rounded-sm" : "rounded-md",
            "hover:bg-accent/80 hover:text-accent-foreground",
            !isExpanded && "justify-center"
          )}
        >
          <IconComponent
            className={cn(
              "flex-shrink-0 transition-transform",
              isExpanded ? "h-5 w-5" : "h-[22px] w-[22px]",
              "hover:scale-105 duration-200"
            )}
          />
          {isExpanded && (
            <span className="ml-2.5 text-[13px] truncate text-muted-foreground">
              {name}
            </span>
          )}
        </button>
      </AddSpaceMenu>
    </div>
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
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

