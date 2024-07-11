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

export function Combobox(props: {
  options?: { value: string; label: React.ReactNode }[];
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
}) {
  const { options = [], value, onChange, placeholder } = props;
  const [open, setOpen] = React.useState(false);
  // const [innerValue, setValue] = React.useState("");

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
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onChange?.(
                      currentValue === value ? undefined : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
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
