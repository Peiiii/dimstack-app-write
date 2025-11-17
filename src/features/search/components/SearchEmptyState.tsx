import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { FileText, Loader2 } from "lucide-react";

type Props = {
  type: "no-space" | "no-query" | "no-results" | "loading";
};

export const SearchEmptyState: React.FC<Props> = ({ type }) => {
  const { t } = useTranslation();

  if (type === "no-space") {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="text-center">
          <p className="text-sm text-muted-foreground/70">{t("search.noSpace")}</p>
        </div>
      </div>
    );
  }

  if (type === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0 text-sm text-muted-foreground/70">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{t("search.searching")}</span>
        </div>
      </div>
    );
  }

  if (type === "no-query") {
    return (
      <div className="flex-1 flex items-center justify-center min-h-0 px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/30">
            <AiOutlineSearch className="h-6 w-6 text-muted-foreground/40" />
          </div>
          <p className="text-sm text-muted-foreground/80">{t("search.noQuery")}</p>
          <p className="mt-1 text-sm text-muted-foreground/60">{t("search.noQueryDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center min-h-0 px-4">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/20">
          <FileText className="h-6 w-6 text-muted-foreground/40" />
        </div>
        <p className="text-sm font-medium text-foreground/90">{t("search.noResults")}</p>
        <p className="mt-1 text-sm text-muted-foreground/60">{t("search.noResultsDesc")}</p>
      </div>
    </div>
  );
};

