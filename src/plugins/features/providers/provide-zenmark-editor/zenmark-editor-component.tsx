import { ZenmarkEditor, KeyMod, KeyCode, matchesKeybinding } from "zenmark-editor";
import { useDocument } from "@/hooks/use-document";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export const ZenmarkEditorComponent = (props: { uri: string }) => {
  const { t } = useTranslation();
  const { uri } = props;
  const { content, setContent, loading, flush } = useDocument(uri, {
    autosave: false,
  });
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      const isSaveShortcut =
        (event.metaKey || event.ctrlKey) && 
        (event.key === "s" || event.key === "S") &&
        !event.shiftKey;
      
      if (isSaveShortcut && editorRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        flush();
      }
    };

    document.addEventListener("keydown", handleDocumentKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown, true);
    };
  }, [flush]);

  if (loading) {
    return <div>{t("zenmark.loading")}</div>;
  }

  const handleKeyDown = (event: {
    keyCode: number;
    code: string;
    key: string;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    metaKey: boolean;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const saveKeybinding = KeyMod.CtrlCmd | KeyCode.KEY_S;
    if (matchesKeybinding(event, saveKeybinding)) {
      event.preventDefault();
      event.stopPropagation();
      flush();
      return true;
    }
    return false;
  };

  return (
    <div ref={editorRef} style={{ height: "100%" }}>
      <ZenmarkEditor
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
