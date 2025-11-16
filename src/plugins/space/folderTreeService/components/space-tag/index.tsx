import { SpaceDef } from "@/toolkit/types/space";
import { FC } from "react";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SpaceTag: FC<{ space: SpaceDef }> = ({ space }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center overflow-hidden w-full">
      <div className="flex items-center overflow-hidden flex-shrink min-w-0 mr-1">
        <div className="text-s text-gray-500 truncate min-w-0">
          {space.owner}
        </div>
        <div className="text-s text-gray-500 flex-shrink-0 mx-0.5">/</div>
        <div className="text-s text-gray-500 truncate min-w-0 flex-shrink">
          {space.repo}
        </div>
      </div>
      {space.readonly && (
        <div className="flex items-center text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-full px-1 mr-1 flex-shrink-0">
          <Lock className="h-2.5 w-2.5 mr-0.5" />
          <span>{t("space.readonly")}</span>
        </div>
      )}
      <div className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-full px-1 flex-shrink-0">
        {space.platform}
      </div>
    </div>
  );
};
