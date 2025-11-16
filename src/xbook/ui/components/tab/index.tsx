import { Button, ButtonProps } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/toolkit/utils/shadcn-utils";
import { Box, HStack, Icon, Spinner } from "@chakra-ui/react";
import { FC, forwardRef, MouseEventHandler, useMemo, useState } from "react";
import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
import { PageDescriptor } from "xbook/ui/page-box/controller";

interface TabAction {
  label: string;
  icon?: React.ElementType;
  onClick: () => void;
  className?: string;
}

interface TabProps {
  title: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onClose?: MouseEventHandler<SVGElement>;
  stretch?: boolean;
  status?: PageDescriptor["status"];
  actions?: TabAction[];
}

export const Tab: FC<TabProps> = ({
  title,
  isActive,
  onClick,
  onClose,
  stretch,
  width,
  minWidth,
  maxWidth,
  status,
  actions = [],
}) => {
  const classList: string[] = ["tab", "hover-action"];
  if (isActive) classList.push("active");
  const shortTitle = useMemo(
    () => title.split("::").splice(-1)[0].split("/").splice(-1)[0],
    [title]
  );
  const [open, setOpen] = useState(false);
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
        display="flex"
        alignItems="center"
        gap="4px"
      >
        {status === "loading" && (
          <Spinner
            size="xs"
            flexShrink={0}
            speed="0.8s"
            thickness="2px"
            color="currentColor"
            title="加载中"
          />
        )}
        {status === "unsaved" && (
          <Box
            w="8px"
            h="8px"
            borderRadius="50%"
            bg="currentColor"
            flexShrink={0}
            title="未保存"
          />
        )}
        {shortTitle}
      </Box>
      {(stretch || width || minWidth) && <Box flexGrow={1} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto min-w-0 hover:bg-transparent hover-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon as={AiOutlineMore} />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-48 p-1" 
          align="start" 
          side="right"
        >
          <div className="grid gap-1">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 px-2 py-1.5 h-auto font-normal",
                  action.className
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  action.onClick();
                  setOpen(false);
                }}
              >
                {action.icon && <Icon as={action.icon} className="h-4 w-4" />}
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Icon
        flexShrink={0}
        className="hover-visible"
        as={AiOutlineClose}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClose?.(e);
        }}
      />
    </HStack>
  );
};
export const TabIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => (
    <Button
      variant="ghost"
      className={cn(
        "p-0 h-auto min-w-0 rounded-none hover:bg-transparent",
        props.className
      )}
      {...props}
      ref={ref}
    />
  )
);
