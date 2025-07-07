// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
export default [
  eslintPluginPrettierRecommended,
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },

  {
    ignores: ['.node_modules/*', '.dist'],
  },
];

// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   {
//     files: ["**/*.{js,mjs,cjs,ts}"],
//     plugins: { js },
//     extends: ["js/recommended"],
//   },
//   {
//     files: ["**/*.{js,mjs,cjs,ts}"],
//     languageOptions: { globals: globals.browser },
//   },
//   tseslint.configs.recommended,
//   {
//     rules: {
//       "no-unused-vars": "error",
//       "prefer-const": "error",
//       "no-unused-expressions":"error",
//       "no-console":"warn",
//       "no-undef":"error"
//     },
//   },
//   {
//     ignores: [".node_modules/*","./dist"]
// },
// ]);
