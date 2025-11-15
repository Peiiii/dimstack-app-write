// Import standalone editor features (commands, find, folding, etc.)
// Keep this single include; the heavy part is languages, which we curate below.
import "monaco-editor/esm/vs/editor/editor.all.js";

// Core API (no implicit global)
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

// Language contributions
// Use minimal but useful set; add more here only when needed.
import "monaco-editor/esm/vs/language/typescript/monaco.contribution"; // ts + js
import "monaco-editor/esm/vs/language/json/monaco.contribution";
import "monaco-editor/esm/vs/language/html/monaco.contribution";
import "monaco-editor/esm/vs/language/css/monaco.contribution"; // css + scss + less

// Basic languages (tokenizers only, no worker)
import "monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution";
import "monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution";
import "monaco-editor/esm/vs/basic-languages/xml/xml.contribution";
import "monaco-editor/esm/vs/basic-languages/sql/sql.contribution";
import "monaco-editor/esm/vs/basic-languages/shell/shell.contribution";
import "monaco-editor/esm/vs/basic-languages/ini/ini.contribution";

export { monaco };
