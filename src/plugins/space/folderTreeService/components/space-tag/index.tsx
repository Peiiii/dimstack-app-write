import { SpaceDef } from "@/toolkit/types/space";
import { FC } from "react";

export const SpaceTag: FC<{ space: SpaceDef }> = ({ space }) => {
  return (
    <div className="flex items-center overflow-hidden w-full">
      <div className="flex items-center overflow-hidden flex-shrink min-w-0 mr-1">
        <div className="text-s text-gray-500 flex-shrink-0 truncate">
          {space.owner}
        </div>
        <div className="text-s text-gray-500 flex-shrink-0 mx-0.5">/</div>
        <div className="text-s text-gray-500 truncate min-w-0 flex-shrink">
          {space.repo}
        </div>
      </div>
      <div className="text-xs text-gray-500 bg-gray-200 rounded-full px-1 flex-shrink-0">
        {space.platform}
      </div>
    </div>
  );
};
