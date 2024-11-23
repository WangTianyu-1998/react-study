module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended", // React Hooks 基础规则
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // 启用并自定义 react-hooks/exhaustive-deps
    "react-hooks/exhaustive-deps": [
      "warn", // 设为 "warn" 或 "error" 以开启检查
      {
        additionalHooks: "(useMyCustomHook)", // 如果有自定义 Hooks，可以在此列出
      },
    ],
    // 启用并自定义 react-hooks/exhaustive-deps
    "react-hooks/exhaustive-deps": [
      "warn", // 设为 "warn" 或 "error" 以开启检查
      {
        additionalHooks: "(useMyCustomHook)", // 如果有自定义 Hooks，可以在此列出
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
