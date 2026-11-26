import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["test/utils/helpers.js"],
    coverage: {
      provider: "v8",
      reporter: ["lcov", "text"],
      include: ["src/**/*.js"],
      exclude: [
        "**/*.test.js",
        "**/*router.js",
        "src/assets/*",
        "src/app/cic/steps.js",
        "src/app/cic/fields.js",
        "src/lib/*",
        "src/app.js",
      ],
      thresholds: { statements: 0, branches: 0, functions: 0, lines: 0 },
      watermarks: {
        statements: [80, 90],
        branches: [80, 90],
        functions: [80, 90],
        lines: [80, 90],
      },
    },
  },
});
