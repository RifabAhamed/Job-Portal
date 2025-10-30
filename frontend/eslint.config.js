// ./frontend/eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react"; // 👈 1. Add this import
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // ⬇️ 2. THIS IS THE MAIN FIX ⬇️
  // You must ignore the build cache and node_modules
  globalIgnores(["dist", ".vite", "node_modules"]),

  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      react.configs.recommended, // 👈 3. Add this for base React rules
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    // 4. Add settings to auto-detect React version
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      // Add these to remove common React/Vite noise
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]);
