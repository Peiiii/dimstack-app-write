import { SpaceDef } from "@/toolkit/types/space";
import { FC } from "react";

export const SpaceTag: FC<{ space: SpaceDef }> = ({ space }) => {
  // [owner]/(斜线分割)[repo] [platform](一个tag)
  return (
    <div className="flex items-center overflow-hidden">
      <div className="text-s max-w-1/2 truncate
       text-gray-500">{space.owner}</div>
      <div className="text-s text-gray-500">/</div>
      <div className="text-s text-gray-500 text-ellipsis whitespace-nowrap max-w-1/2 truncate
      ">{space.repo}</div>
      <div className="text-xs text-gray-500 bg-gray-200 rounded-full px-1 ml-1">{space.platform}</div>
    </div>
  );
};
