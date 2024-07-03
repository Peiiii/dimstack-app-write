import { fileSystemHelper } from "@/helpers/file-system.helper";
import { useEffect, useRef } from "react";

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
  useEffect(() => {
    if (ref.current) {
      console.log("[parent] iframe mounted.");
      ref.current!.onload = () => {
        console.log("[parent] I will post a message.");
        const fid = fileSystemHelper.generateFileId(spaceId, path);
        fileSystemHelper.service.read(fid).then((content) => {
          ref.current!.contentWindow?.postMessage(
            JSON.stringify({
              content,
            }),
            "*"
          );
        });
      };
    }
  }, [ref.current]);

  return (
    <iframe ref={ref} src={url} style={{ width: "100%", height: "100%" }} />
  );
};
