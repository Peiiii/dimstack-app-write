import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";

// const hajackDefine = () => {
//   const systemJsDefine = (window as any).define;
//   (window as any).define = null;
//   return () => {
//     (window as any).define = systemJsDefine;
//   };
// };

// const restoreDefine = hajackDefine();

import React from "react";
const LazyCustomMonacoEditor = React.lazy(() =>
  import("@/components/custom-monaco-editor").then((m) => ({
    default: m.CustomMonacoEditor,
  }))
);

export function OnlineReactIde() {
  const [code, setCode] = useState(`
import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      <h1>Hello, React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
`);
  const [compiledCode, setCompiledCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTab, setActiveTab] = useState("editor");

  const compileCode = (sourceCode: string) => {
    // try {
    //   const output = Babel.transform(sourceCode, {
    //     presets: ["react"],
    //   }).code;
    //   setCompiledCode(output || "");
    //   setError(null);
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : String(err));
    // }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      compileCode(value);
    }
  };

  const executeCode = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        iframeDoc.open();
        const iframeContent = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>React Preview</title>
              <style>
                body { margin: 0; padding: 16px; }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script type="importmap">
                {
                  "imports": {
                    "react": "https://esm.sh/react@17",
                    "react-dom": "https://esm.sh/react-dom@17"
                  }
                }
              </script>
              <script type="module">
                import React from 'react';
                import ReactDOM from 'react-dom';

                const code = \`${compiledCode}\`;
                const transformedCode = await import(\`data:text/javascript;base64,\${btoa(code)}\`);
                const App = transformedCode.default;

                ReactDOM.render(
                  React.createElement(App),
                  document.getElementById('root')
                );
              </script>
            </body>
          </html>
        `;
        iframeDoc.write(iframeContent);
        iframeDoc.close();
      }
    }
  };

  useEffect(() => {
    compileCode(code);
  }, []);

  useEffect(() => {
    if (activeTab === "preview" && !error) {
      executeCode();
    }
  }, [activeTab, compiledCode, error]);

  return (
    <Card className="w-full h-[calc(100vh-2rem)] mx-auto overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle>Online React IDE</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)]">
        <Tabs
          defaultValue="editor"
          className="w-full h-full flex flex-col"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full flex justify-start mb-2">
            <TabsTrigger value="editor" className="flex-1">
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
          </TabsList>
          <div className="flex-grow overflow-hidden">
            <TabsContent
              value="editor"
              className="h-full"
              forceMount
              style={{ display: activeTab === "editor" ? "block" : "none" }}
            >
              <div className="relative h-full">
                <React.Suspense fallback={<div>加载编辑器中...</div>}>
                  <LazyCustomMonacoEditor
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                    }}
                    // onMount={() => {
                    //   restoreDefine();
                    // }}
                  />
                </React.Suspense>
                <div className="absolute bottom-4 right-4">
                  <Button onClick={executeCode}>Run Code</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="preview"
              className="h-full"
              forceMount
              style={{ display: activeTab === "preview" ? "block" : "none" }}
            >
              <iframe
                ref={iframeRef}
                title="React Preview"
                className="w-full h-full border-0"
              ></iframe>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      {error && (
        <Alert variant="destructive" className="mt-4 mx-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Card>
  );
}
