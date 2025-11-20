import { fileSystemHelper } from "@/helpers/file-system.helper";
import { useEffect, useRef } from "react";

interface IframeOpenerProps {
  url: string;
  path: string;
  spaceId: string;
}

export function IframeOpener({ url, path, spaceId }: IframeOpenerProps) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleLoad = () => {
      const fid = fileSystemHelper.generateFileId(spaceId, path);
      fileSystemHelper.service.read(fid).then((content) => {
        ref.current?.contentWindow?.postMessage(
          JSON.stringify({ content }),
          "*"
        );
      });
    };

    const iframe = ref.current;
    iframe.onload = handleLoad;
    return () => {
      iframe.onload = null;
    };
  }, [path, spaceId]);

  return (
    <iframe ref={ref} src={url} style={{ width: "100%", height: "100%" }} />
  );
}
