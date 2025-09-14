// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true, // helps resolve base configs
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // ignore unused variables
      "react/no-unescaped-entities": "off",       // allow unescaped apostrophes in JSX
      "prefer-const": "off",                      // don't require const for variables
    },
  },
];
