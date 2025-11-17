import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

type Props = {
  loading: boolean;
  query: string;
  total: number;
};

export const SearchStatusBar: React.FC<Props> = ({ loading, query, total }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-3 flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
        {loading ? (
          <span className="flex items-center gap-1.5">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>{t("search.searching")}</span>
          </span>
        ) : query ? (
          total > 0 ? (
            <span>
              <span className="font-medium text-foreground">{total}</span>
              <span className="ml-1">{t("search.results")}</span>
            </span>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

