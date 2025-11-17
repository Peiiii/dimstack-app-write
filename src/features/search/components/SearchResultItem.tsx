import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import { cn } from "@/toolkit/utils/shadcn-utils";
import { highlightText } from "../utils";

type SearchResult = {
  id: string;
  path: string;
  title?: string;
  snippet: string;
};

type Props = {
  item: SearchResult;
  query: string;
  isActive: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  itemRef?: React.RefObject<HTMLDivElement>;
};

const getFileExtension = (path: string) => (path.split("/").pop() || "").split(".").pop() || "";

export const SearchResultItem: React.FC<Props> = ({
  item,
  query,
  isActive,
  onSelect,
  onMouseEnter,
  itemRef,
}) => {
  const { t } = useTranslation();
  const ext = getFileExtension(item.path);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      ref={itemRef}
      className={cn(
        "group relative cursor-pointer rounded-lg px-4 py-2.5 transition-all duration-150",
        "hover:bg-muted/40 focus-within:bg-muted/40",
        isActive && "bg-muted/50"
      )}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      onFocus={onMouseEnter}
      tabIndex={0}
      role="button"
      aria-label={t("search.openFile", { path: item.path })}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-xs font-medium text-muted-foreground/60 bg-muted/40 group-hover:bg-muted/60 transition-colors">
          {ext || "·"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-foreground">
            {highlightText(item.title || item.path.split("/").pop() || item.path, query)}
          </div>
          <div className="mt-0.5 truncate text-sm text-muted-foreground/70">{item.path}</div>
          {item.snippet && (
            <div className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground/80">
              {highlightText(item.snippet, query)}
            </div>
          )}
        </div>
        <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

