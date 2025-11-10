module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "libs/**", "packages/**"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint", "unused-imports", "import"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": [
      "warn",
      { allow: ["log", "clear", "info", "error", "dir", "trace"] },
    ],
    "@typescript-eslint/no-explicit-any": ["warn"],
    // Disable base unused-vars in favor of plugin that can autofix imports
    "@typescript-eslint/no-unused-vars": ["off"],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    // Forbid global serviceBus imperative calls; prefer singletons or typed APIs
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "MemberExpression[object.object.name='xbook'][object.property.name='serviceBus'][property.name='invoke']",
        message:
          "Use direct singletons or typed APIs instead of serviceBus.invoke",
      },
      {
        selector:
          "CallExpression[callee.object.object.name='xbook'][callee.object.property.name='serviceBus'][callee.property.name='createProxy']",
        message:
          "Use direct singletons instead of serviceBus.createProxy(Tokens.X)",
      },
    ],
    // Ensure imported named exports actually exist
    "import/named": "error",
  },
  overrides: [
    {
      files: ["src/services/space-file-system-provider-proxy.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": ["error"],
      },
    },
  ],
};
