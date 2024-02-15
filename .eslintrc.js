module.exports = {
  env: {
    node: true,
    es6: true,
    es2020: true,
    mocha: true,
  },
  globals: {
    sinon: true,
    expect: true,
    setupDefaultMocks: "readonly",
  },
  root: true,
  extends: ["eslint:recommended", "prettier"],
  rules: {
    "no-console": "off",
    "padding-line-between-statements": [
      "error",
      { blankLine: "any", prev: "*", next: "*" },
    ],
  },
};
