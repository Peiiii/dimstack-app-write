import {
  As,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { componentService, eventBus } from "xbook/services";
import { ShortcutItem } from "xbook/ui/activiti-bar/types";

const crossDirection = (direction: string) => {
  return direction === "row" ? "column" : "row";
};

export const ShortcutItemView = ({
  direction,
  shortcut,
  isMobile,
  iconFontSize,
  textFontSize,
}: {
  direction: string;
  shortcut: ShortcutItem;
  isMobile?: boolean;
  iconFontSize?: string;
  textFontSize?: string;
}) => {
  const { id, icon, name, hasPopover } = shortcut;
  const props = {};
  if (crossDirection(direction) === "row") {
    props["w"] = "100%";
  } else {
    props["h"] = "100%";
  }
  const classList: string[] = ["activity", "shortcut"];

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
              maxW={"100%"}
              overflow={"hidden"}
              onClick={() => {
                eventBus.emit(`shortcut:${id}:clicked`);
              }}
            >
              <VStack maxW={"100%"} overflow={"hidden"} gap={0}>
                <Icon
                  as={icon as As}
                  fontSize={iconFontSize}
                  title={name}
                ></Icon>
                <Text
                  m="0 !important"
                  fontSize={textFontSize}
                  className="shortcut-text text"
                  maxW={"100%"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                >
                  {name}
                </Text>
              </VStack>
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
      maxW={"100%"}
      overflow={"hidden"}
      onClick={() => {
        eventBus.emit(`shortcut:${id}:clicked`);
      }}
    >
      <VStack maxW={"100%"} overflow={"hidden"} gap={0}>
        <Icon as={icon as As} fontSize={iconFontSize} title={name}></Icon>
        <Text
          m="0 !important"
          fontSize={textFontSize}
          className="shortcut-text text"
          maxW={"100%"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
        >
          {name}
        </Text>
      </VStack>
    </Stack>
  );
};
