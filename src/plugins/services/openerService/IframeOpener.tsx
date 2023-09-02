import { DataStore } from "@/toolkit/common/dataStore";
import { SpaceDef } from "@/toolkit/types/space";
import { createGiteeClient } from "libs/gitee-api";
import { useCallback, useEffect, useRef } from "react";
import xbook from "xbook/index";

export default ({
  url,
  path,
  spaceId,
}: {
  url: string;
  path: string;
  spaceId: string;
}) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const spaceStore = xbook.registry.get("spaceStore") as DataStore<SpaceDef>;
  const space = spaceStore.useRecord(spaceId)!;
  const getFileContent = useCallback(async () => {
    const { access_token, refresh_token } = space.auth || {};
    const File = createGiteeClient({ accessToken: access_token }).File;
    return (await File.get({ owner: space.owner, repo: space.repo, path })).data
      .content;
  }, [space, path]);
  useEffect(() => {
    if (ref.current) {
      console.log("[parent] iframe mounted.");
      ref.current!.onload = () => {
        console.log("[parent] I will post a message.");
        getFileContent().then((content) => {
          ref.current!.contentWindow?.postMessage(
            JSON.stringify({
              content,
            }),
            "*"
          );
        });
      };
    }
  }, [ref.current, getFileContent]);

  return (
    <iframe ref={ref} src={url} style={{ width: "100%", height: "100%" }} />
  );
};
