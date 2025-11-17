import { useRef, useEffect } from "react";
import { SearchEmptyState } from "./SearchEmptyState";
import { SearchResultItem } from "./SearchResultItem";

type SearchResult = {
  id: string;
  path: string;
  title?: string;
  snippet: string;
};

type Props = {
  items: SearchResult[];
  query: string;
  loading: boolean;
  activeIndex: number;
  onItemSelect: (index: number) => void;
  onItemHover: (index: number) => void;
  activeItemRef?: React.RefObject<HTMLDivElement>;
};

export const SearchResultList: React.FC<Props> = ({
  items,
  query,
  loading,
  activeIndex,
  onItemSelect,
  onItemHover,
  activeItemRef,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeItemRef?.current && listRef.current) {
      const container = listRef.current;
      const item = activeItemRef.current;
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (itemRect.bottom > containerRect.bottom) {
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else if (itemRect.top < containerRect.top) {
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [activeIndex, activeItemRef]);

  const getEmptyStateType = (): "no-query" | "no-results" | "loading" | null => {
    if (loading && query) return "loading";
    if (!query) return "no-query";
    if (query && items.length === 0) return "no-results";
    return null;
  };

  const emptyStateType = getEmptyStateType();

  return (
    <div
      ref={listRef}
      className="mt-3 flex-1 min-h-0 overflow-auto rounded-xl scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
    >
      {emptyStateType && <SearchEmptyState type={emptyStateType} />}

      {!emptyStateType && items.length > 0 && (
        <div className="space-y-0.5">
          {items.map((item, idx) => (
            <SearchResultItem
              key={item.id}
              item={item}
              query={query}
              isActive={idx === activeIndex}
              onSelect={() => onItemSelect(idx)}
              onMouseEnter={() => onItemHover(idx)}
              itemRef={idx === activeIndex ? activeItemRef : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

