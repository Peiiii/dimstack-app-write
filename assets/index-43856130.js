import { u as useColorMode, R as React, j as jsxRuntimeExports } from "./chakra-ui-1d60df8d.js";
import { e as editor, K as KeyMod, a as KeyCode } from "./monaco-45e206c0.js";
const CustomMonacoEditor = (props) => {
  const { colorMode } = useColorMode();
  const {
    theme: propTheme,
    options: monacoOptions,
    onMount,
    value,
    language,
    keyBindings,
    onChange
  } = props;
  const editorRef = React.useRef(
    null
  );
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    if (!containerRef.current)
      return;
    const currentTheme = propTheme || (colorMode === "dark" ? "vs-dark" : "vs");
    editorRef.current = editor.create(containerRef.current, {
      value,
      language,
      theme: currentTheme,
      ...monacoOptions
    });
    onMount == null ? void 0 : onMount();
    const changeModelContentSubscription = editorRef.current.onDidChangeModelContent(() => {
      var _a;
      onChange == null ? void 0 : onChange(((_a = editorRef.current) == null ? void 0 : _a.getValue()) ?? "");
    });
    keyBindings == null ? void 0 : keyBindings.forEach((binding) => {
      var _a;
      (_a = editorRef.current) == null ? void 0 : _a.addCommand(binding.key, binding.action);
    });
    const resizeObserver = new ResizeObserver(() => {
      var _a;
      (_a = editorRef.current) == null ? void 0 : _a.layout();
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      var _a;
      resizeObserver.disconnect();
      changeModelContentSubscription.dispose();
      (_a = editorRef.current) == null ? void 0 : _a.dispose();
    };
  }, [value, language, monacoOptions, onMount, keyBindings, propTheme, colorMode, onChange]);
  React.useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      const position = editorRef.current.getPosition();
      editorRef.current.setValue(value);
      if (model && position) {
        editorRef.current.setPosition(position);
        editorRef.current.revealPosition(position);
      }
    }
  }, [value]);
  React.useEffect(() => {
    if (editorRef.current && !propTheme) {
      const newTheme = colorMode === "dark" ? "vs-dark" : "vs";
      editor.setTheme(newTheme);
    }
  }, [colorMode, propTheme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, style: { height: "100%" } });
};
const MonacoKeyMod = KeyMod;
const MonacoKeyCode = KeyCode;
export {
  CustomMonacoEditor,
  MonacoKeyCode,
  MonacoKeyMod
};
