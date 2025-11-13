import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

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
  return (
    <Select value={value} onValueChange={onValueChange} disabled={loading || options.length === 0}>
      <SelectTrigger className="w-full max-w-[280px]">
        {loading ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>加载中...</span>
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
