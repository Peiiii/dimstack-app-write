import { Box, Button, HStack, Icon, forwardRef } from "@chakra-ui/react";
import { FC, MouseEventHandler, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PageDescriptor } from "xbook/ui/page-box";

export const Tab: FC<{
  title: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onClose?: MouseEventHandler<SVGElement>;
  stretch?: boolean;
  status?: PageDescriptor["status"];
}> = ({
  title,
  isActive,
  onClick,
  onClose,
  stretch,
  width,
  minWidth,
  maxWidth,
  status,
}) => {
  const classList: string[] = ["tab", "hover-action"];
  if (isActive) classList.push("active");
  const shortTitle = useMemo(
    () => title.split("::").splice(-1)[0].split("/").splice(-1)[0],
    [title]
  );
  return (
    <HStack
      h="100%"
      m="0 !important"
      className={classList.join(" ")}
      pl="12px"
      pr="12px"
      align={"center"}
      justify="flex-start"
      overflow={"hidden"}
      onClick={onClick}
      w={width !== undefined ? width : stretch ? "100%" : undefined}
      minW={minWidth}
      maxW={maxWidth}
      flexGrow={1}
      flexShrink={0}
    >
      <Box
        textOverflow={"ellipsis"}
        overflow={"hidden"}
        whiteSpace={"nowrap"}
        title={title}
        className="tab-title"
        flexGrow={1}
        textDecoration={status === "deleted" ? "line-through" : undefined}
      >
        {shortTitle}
      </Box>
      {(stretch || width || minWidth) && <Box flexGrow={1} />}
      <Icon
        flexShrink={0}
        className="hover-visible"
        as={AiOutlineClose}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClose?.(e);
        }}
      ></Icon>
    </HStack>
  );
};
export const TabIconButton = forwardRef((_, ref) => (
  <Button bg="none" p="0" borderRadius={0} color={"inherit"} {..._} ref={ref} />
));
