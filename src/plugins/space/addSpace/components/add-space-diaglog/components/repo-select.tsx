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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/toolkit/utils/shadcn-utils";
import { useState } from "react";

interface RepoSelectProps {
  value?: string;
  options: { value: string; label: string }[];
  loading?: boolean;
  placeholder?: string;
  onValueChange: (value: string) => void;
}

export const RepoSelect = ({
  value,
  options,
  loading,
  placeholder = "选择仓库",
  onValueChange,
}: RepoSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-11 font-normal bg-background",
            !value && "text-muted-foreground"
          )}
          disabled={loading || options.length === 0}
        >
          <span className="truncate text-left">
            {loading
              ? "加载中..."
              : selectedOption
              ? selectedOption.label
              : placeholder}
          </span>
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0 z-[9999]" 
        align="start"
        sideOffset={4}
      >
        <Command>
          <CommandInput placeholder="搜索仓库..." className="h-10" />
          <CommandList>
            <CommandEmpty className="py-6 text-sm text-muted-foreground">未找到仓库</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onValueChange(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
