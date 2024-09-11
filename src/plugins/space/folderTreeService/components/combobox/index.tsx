import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SafeAny } from "@/toolkit/types";
import { cn } from "@/toolkit/utils/shadcn-utils";

export function Combobox(props: {
  options?: {
    value: string;
    label: React.ReactNode;
    data?: SafeAny;
    title: string;
  }[];
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
}) {
  const { options = [], value, onChange, placeholder } = props;
  const [open, setOpen] = React.useState(false);
  const selectedItem = options.find((item) => item.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex w-full h-10 justify-start items-center flex-shrink overflow-hidden ml-1 px-1 py-1", // 按钮高度和布局
            !open && "bg-transparent", // 默认背景透明
            "hover:bg-gray-200", // 悬停背景
            "focus:ring-0 focus:border-0" // 去除焦点边框
          )}
        >
          {/* 容器：图标和文字 */}
          <div className="flex items-center space-x-2">
            {/* 左侧圆角矩形图标，动态显示用户名的首字母 */}
            <div className="flex items-center justify-center w-7 h-7 bg-teal-200 rounded-md">
              <span className="text-black font-semibold text-lg">
                {selectedItem?.title?.charAt(0).toUpperCase()}{" "}
                {/* 动态获取首字母 */}
              </span>
            </div>

            {/* 显示用户名或占位符 */}
            <span
              className={cn(
                "truncate", // 防止溢出
                value
                  ? "font-semibold text-base text-gray-800"
                  : "text-gray-400" // 加粗文本
              )}
            >
              {selectedItem?.label || placeholder}{" "}
              {/* 显示当前用户名或者占位符 */}
            </span>
          </div>

          {/* 下拉图标 */}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command
          defaultValue={value}
          filter={(value, search) => {
            const item = options.find((item) => item.value === value);
            if (!item) return 0;
            const context = `${item.data?.platform} ${item.data?.repo} ${item.data?.owner}`;
            if (context.includes(search)) return 1;
            return 0;
          }}
        >
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            onValueChange={(v) => {}}
          />
          <CommandEmpty>未找到</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange?.(
                      currentValue === value ? undefined : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
