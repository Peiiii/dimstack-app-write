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
import { cn } from "@/toolkit/utils/shadcn-utils";
import { SafeAny } from "@/toolkit/types";
import { space } from "@chakra-ui/react";

export function Combobox(props: {
  options?: { value: string; label: React.ReactNode; data?: SafeAny }[];
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
}) {
  const { options = [], value, onChange, placeholder } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-8 justify-between flex-shrink overflow-hidden"
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {/* <div
          className="
        flex items-center justify-start w-[200px] h-9 px-2  rounded-md cursor-pointer"
        >
          {value
            ? options.find((framework) => framework.value === value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div> */}
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command
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
          <CommandEmpty>No framework found.</CommandEmpty>
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
