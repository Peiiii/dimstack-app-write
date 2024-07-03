import * as monaco from "monaco-editor";
import React from "react";

type KeyBinding = {
  key: number;
  action: () => void;
};

type Props = {
  value: string;
  language: string;
  onChange?: (value: string) => void;
  keyBindings?: KeyBinding[];
};

export const CustomMonacoEditor = (props: Props) => {
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (!containerRef.current) return;

    editorRef.current = monaco.editor.create(containerRef.current, {
      value: props.value,
      language: props.language,
    });

    const changeModelContentSubscription =
      editorRef.current.onDidChangeModelContent(() => {
        props.onChange?.(editorRef.current?.getValue() ?? "");
      });

    props.keyBindings?.forEach((binding) => {
      editorRef.current?.addCommand(binding.key, binding.action);
    });

    const resizeObserver = new ResizeObserver(() => {
      editorRef.current?.layout();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      changeModelContentSubscription.dispose();
      editorRef.current?.dispose();
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  React.useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      const position = editorRef.current.getPosition();

      editorRef.current.setValue(props.value);

      if (model && position) {
        editorRef.current.setPosition(position);
        editorRef.current.revealPosition(position);
      }
    }
  }, [props.value]); // This effect runs whenever props.value changes

  return <div ref={containerRef} style={{ height: "100%" }} />;
};

export const MonacoKeyMod = monaco.KeyMod;
export const MonacoKeyCode = monaco.KeyCode;
