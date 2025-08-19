import { EventKeys } from "@/constants/eventKeys";
import {
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text
} from "@chakra-ui/react";
import { componentService, eventBus } from "xbook/services";
import { IShortcutItem } from "xbook/services/shortcutService";

const crossDirection = (direction: string) => {
  return direction === "row" ? "column" : "row";
};

export const ShortcutItemView = ({
  direction,
  shortcut,
  isMobile,
  iconFontSize,
  textFontSize,
  isExpanded,
}: {
  direction: string;
  shortcut: IShortcutItem;
  isMobile?: boolean;
  iconFontSize?: string;
  textFontSize?: string;
  isExpanded: boolean;
}) => {
  const { id, icon, name, hasPopover } = shortcut;
  const IconComponent = componentService.useComponent(
    icon || "AiOutlineQuestionCircle"
  );

  const props = {};
  if (crossDirection(direction) === "row") {
    props["w"] = "100%";
  } else {
    props["h"] = "100%";
  }

  const content = (
    <Stack
      direction="row"
      spacing={2}
      maxW={"100%"}
      overflow={"hidden"}
      align="center"
      justify={isExpanded ? "flex-start" : "center"}
      p={isExpanded ? "0 10px" : "0"}
      onClick={() => {
        eventBus.emit(EventKeys.Shortcut.ShortcutClicked(id));
      }}
    >
      <Icon
        as={IconComponent}
        fontSize={iconFontSize}
        title={name}
        flexShrink={0}
      />
      {isExpanded && (
        <Text
          m="0 !important"
          fontSize={textFontSize}
          className="shortcut-text text"
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          ml={2}
        >
          {name}
        </Text>
      )}
    </Stack>
  );

  return hasPopover ? (
    <Popover
      key={id}
      placement={isMobile ? "auto" : "right-end"}
      isLazy
      closeOnBlur={true}
      returnFocusOnClose={true}
    >
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Stack
              direction={crossDirection(direction)}
              {...props}
              className="activity-wrapper shortcut"
              key={id}
              m="0 !important"
              marginInlineStart={"10px"}
              justify={"center"}
              align="center"
              maxW={isExpanded ? "150px" : "48px"}
              overflow={"hidden"}
            >
              {content}
            </Stack>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              _focus={{
                boxShadow: "none",
              }}
              maxW={"100vw"}
              borderRadius={"4px"}
              onClick={() => {
                onClose();
              }}
            >
              <PopoverArrow />
              <PopoverBody>
                {componentService.render({
                  type: `shortcut:${id}:page`,
                })}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  ) : (
    <Stack
      direction={crossDirection(direction)}
      {...props}
      className="activity-wrapper shortcut"
      key={id}
      m="0 !important"
      marginInlineStart={"10px"}
      justify={"center"}
      align="center"
      maxW={isExpanded ? "150px" : "48px"}
      overflow={"hidden"}
    >
      {content}
    </Stack>
  );
};
