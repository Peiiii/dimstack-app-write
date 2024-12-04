// components/ActivityItem.tsx
import { As, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { AiFillFolder } from "react-icons/ai";
import { componentService } from "xbook/services";
import { IActivityItem } from "xbook/ui/activiti-bar/types";
import { DragSortItem } from "xbook/ui/components/DragSort";

const ActivityItem = ({
  activity,
  index,
  moveItem,
  crossDirection,
  activeId,
  showActivity,
  iconFontSize,
  textFontSize,
  isExpanded,
}: {
  activity: IActivityItem;
  index: number;
  moveItem: any;
  crossDirection: "row" | "column";
  activeId: string;
  showActivity: any;
  iconFontSize: string;
  textFontSize: string;
  isExpanded: boolean;
}) => {
  const { icon = "AiFillFolder", name, id, unselectable: disableSelect } = activity;
  const IconComponent = componentService.useComponent(icon) || AiFillFolder;
  const classList = ["activity-wrapper", "activity"];
  if (activeId && activeId === id) classList.push("active");
  const className = classList.join(" ");
  const props = {};
  if (crossDirection === "row") {
    props["w"] = "100%";
  } else {
    props["h"] = "100%";
  }

  return (
    <DragSortItem key={id} id={id} index={index} moveItem={moveItem}>
      <Stack
        direction="row"
        {...props}
        className={className}
        key={id}
        maxW={isExpanded ? "150px" : "48px"}
        overflow={"hidden"}
        m="0 !important"
        marginInlineStart={"10px"}
        justify={isExpanded ? "flex-start" : "center"}
        align="center"
        p={isExpanded ? "0 10px" : "0"}
      >
        <Icon
          className="icon"
          as={IconComponent as As}
          fontSize={iconFontSize}
          flexShrink={0}
        />
        {isExpanded && (
          <Text
            m="0 !important"
            fontSize={textFontSize}
            className="activity-text text"
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            ml={2}
          >
            {name}
          </Text>
        )}
      </Stack>
    </DragSortItem>
  );
};

export default ActivityItem;
