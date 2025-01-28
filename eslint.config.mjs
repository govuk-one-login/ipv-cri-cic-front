import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules", "**/dist", "test/reports*"],
}, ...compat.extends("eslint:recommended", "prettier"), {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.mocha,
            sinon: true,
            expect: true,
            setupDefaultMocks: "readonly",
        },
    },

    rules: {
        "no-console": "off",

        "padding-line-between-statements": ["error", {
            blankLine: "any",
            prev: "*",
            next: "*",
        }],
    },
}];