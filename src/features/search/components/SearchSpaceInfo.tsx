import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

type Space = {
  id: string;
  owner: string;
  repo: string;
};

type Props = {
  space?: Space;
  onReindex?: () => void;
  indexing?: boolean;
  disabled?: boolean;
};

export const SearchSpaceInfo: React.FC<Props> = ({ space, onReindex, indexing = false, disabled = false }) => {
  const { t } = useTranslation();

  if (!space) return null;

  return (
    <div className="px-4 pb-2 flex items-center justify-between">
      <div className="text-xs font-medium text-muted-foreground/50 uppercase tracking-wider">
        {space.owner}/{space.repo}
      </div>
      {onReindex && (
        <button
          type="button"
          onClick={onReindex}
          disabled={disabled || indexing}
          className="text-xs text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {indexing ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>{t("search.indexing")}</span>
            </span>
          ) : (
            t("search.reindex")
          )}
        </button>
      )}
    </div>
  );
};

