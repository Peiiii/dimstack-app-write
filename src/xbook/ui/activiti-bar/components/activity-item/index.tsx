// components/ActivityItem.tsx
import { As, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { AiFillFolder, AiOutlineQuestionCircle } from "react-icons/ai";
import { componentService } from "xbook/services";
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
}) => {
  const { icon = "AiFillFolder", name, id } = activity;
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
        direction={crossDirection}
        {...props}
        className={className}
        key={id}
        maxW={"100%"}
        overflow={"hidden"}
        m="0 !important"
        marginInlineStart={"10px"}
        justify={"center"}
        align="center"
      >
        <VStack
          maxW={"100%"}
          gap={0}
          overflow={"hidden"}
          title={name}
          onClick={() => showActivity(id)}
        >
          <Icon
            className="icon"
            as={IconComponent as As}
            fontSize={iconFontSize}
          ></Icon>
          <Text
            m="0 !important"
            fontSize={textFontSize}
            className="activity-text text"
            maxW={"100%"}
            p="0px 4px"
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {name.slice(0, 2).toUpperCase()}
          </Text>
        </VStack>
      </Stack>
    </DragSortItem>
  );
};

export default ActivityItem;
