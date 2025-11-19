import { Github } from "lucide-react";
import { BaseActivityItem } from "xbook/ui/activiti-bar/components/base-activity-item";

interface GithubShortcutProps {
  shortcut: {
    id: string;
    name: string;
    icon: string;
  };
  isExpanded: boolean;
}

export default function GithubShortcut({
  shortcut,
  isExpanded,
}: GithubShortcutProps) {
  return (
    <BaseActivityItem
      activity={{ id: shortcut.id, name: shortcut.name, icon: shortcut.icon } as any}
      isExpanded={isExpanded}
      icon={<Github className="w-full h-full" />}
      onClick={() => {
        window.open("https://github.com/Peiiii/gitary", "_blank", "noopener,noreferrer");
      }}
    />
  );
}
