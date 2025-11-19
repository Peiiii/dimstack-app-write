import { BaseActivityItem } from "xbook/ui/activiti-bar/components/base-activity-item";
import { IActivityItem } from "xbook/ui/activiti-bar/types";

interface GitaryBrandActivityItemProps {
  activity: IActivityItem;
  isExpanded: boolean;
}

export function GitaryBrandActivityItem({
  activity,
  isExpanded,
}: GitaryBrandActivityItemProps) {
  return (
    <BaseActivityItem
      activity={activity}
      isExpanded={isExpanded}
      icon={
        <img
          src="/logo.svg"
          alt="Gitary"
          className="w-full h-full object-contain"
        />
      }
      textClassName="font-semibold tracking-tight"
    />
  );
}

