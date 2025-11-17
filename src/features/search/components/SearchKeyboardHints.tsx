import { useTranslation } from "react-i18next";

type Props = {
  itemsCount: number;
  activeIndex: number;
};

export const SearchKeyboardHints: React.FC<Props> = ({ itemsCount, activeIndex }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between px-4 pb-3 text-xs text-muted-foreground/70 flex-shrink-0">
      <div className="flex items-center gap-3">
        <kbd className="rounded-md bg-muted/50 px-2 py-1 font-mono text-xs">↑</kbd>
        <kbd className="rounded-md bg-muted/50 px-2 py-1 font-mono text-xs">↓</kbd>
        <span className="text-xs">{t("search.navigation")}</span>
        <span className="text-muted-foreground/50">·</span>
        <kbd className="rounded-md bg-muted/50 px-2 py-1 font-mono text-xs">↵</kbd>
        <span className="text-xs">{t("search.open")}</span>
        <span className="text-muted-foreground/50">·</span>
        <kbd className="rounded-md bg-muted/50 px-2 py-1 font-mono text-xs">ESC</kbd>
        <span className="text-xs">{t("search.close")}</span>
      </div>
      <div className="flex items-center gap-2">
        {itemsCount > 0 && (
          <div className="text-muted-foreground/60 text-xs">
            {activeIndex + 1} / {itemsCount}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-muted-foreground/50 text-xs">
          <kbd className="rounded-md bg-muted/40 px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
          <span>{t("search.openSearch")}</span>
        </div>
      </div>
    </div>
  );
};

