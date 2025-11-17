import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { cn } from "@/toolkit/utils/shadcn-utils";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

type Props = {
  spaceId?: string;
  query: string;
  onQueryChange: (value: string) => void;
  loading: boolean;
  stale: boolean | null;
  onValidate: () => void;
  onAcceptHead: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const SearchInputBar: React.FC<Props> = ({
  spaceId,
  query,
  onQueryChange,
  loading,
  stale,
  onValidate,
  onAcceptHead,
  onKeyDown,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <div className="relative flex-shrink-0 px-4">
      <div className="relative flex items-center gap-2.5 px-4 py-3 transition-all duration-200">
        <AiOutlineSearch className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-colors duration-200" />

        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={spaceId ? t("search.placeholder") : t("search.selectSpaceFirst")}
          onKeyDown={onKeyDown}
          className="flex-1 border-0 bg-transparent text-sm placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={disabled}
        />

        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground flex-shrink-0" />}

        {!loading && typeof stale === "boolean" && (
          <button
            type="button"
            onClick={stale ? onAcceptHead : onValidate}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2 py-1 text-sm transition-all duration-150",
              "hover:bg-background/60 focus:outline-none",
              stale ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"
            )}
            title={stale ? t("search.indexStale") : t("search.indexNormal")}
          >
            {stale ? <AlertCircle className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
};
