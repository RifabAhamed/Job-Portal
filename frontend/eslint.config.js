// ./frontend/eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  // 1. Global Ignores: This will fix your 200+ errors
  // by ignoring the build cache and dependencies.
  {
    ignores: ["dist/", ".vite/", "node_modules/"],
  },

  // 2. Base JavaScript Config
  js.configs.recommended,

  // 3. Main React/JSX Config
  {
    files: ["**/*.{js,jsx}"],

    // 4. Plugins: This is the new "flat config" object format
    // This replaces the "extends" array and fixes your error.
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
      globals: {
        ...globals.browser, // Add browser global variables
      },
    },

    // 5. Rules: We spread the recommended rules from each plugin
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      // Your custom rules from your file
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // Rules for modern React/Vite
      "react-refresh/only-export-components": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },

    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
];
