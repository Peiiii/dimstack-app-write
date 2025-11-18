import { Q as useColorMode, R as React, j as jsxRuntimeExports } from "./chakra-ui-74c9882f.js";
import { e as editor, K as KeyMod, a as KeyCode } from "./monaco-45e206c0.js";
const CustomMonacoEditor = (props) => {
  const { colorMode } = useColorMode();
  const { theme: propTheme, options: monacoOptions, onMount } = props;
  const editorRef = React.useRef(
    null
  );
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    var _a;
    if (!containerRef.current)
      return;
    const currentTheme = propTheme || (colorMode === "dark" ? "vs-dark" : "vs");
    editorRef.current = editor.create(containerRef.current, {
      value: props.value,
      language: props.language,
      theme: currentTheme,
      ...monacoOptions
    });
    onMount == null ? void 0 : onMount();
    const changeModelContentSubscription = editorRef.current.onDidChangeModelContent(() => {
      var _a2, _b;
      (_b = props.onChange) == null ? void 0 : _b.call(props, ((_a2 = editorRef.current) == null ? void 0 : _a2.getValue()) ?? "");
    });
    (_a = props.keyBindings) == null ? void 0 : _a.forEach((binding) => {
      var _a2;
      (_a2 = editorRef.current) == null ? void 0 : _a2.addCommand(binding.key, binding.action);
    });
    const resizeObserver = new ResizeObserver(() => {
      var _a2;
      (_a2 = editorRef.current) == null ? void 0 : _a2.layout();
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      var _a2;
      resizeObserver.disconnect();
      changeModelContentSubscription.dispose();
      (_a2 = editorRef.current) == null ? void 0 : _a2.dispose();
    };
  }, [props.language]);
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
  }, [props.value]);
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
