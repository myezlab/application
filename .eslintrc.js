module.exports = {
  root: true, // obligatoire dans l'ancienne config
  env: {
    node: true,
    browser: true,
    es2021: true,
    "playwright/test/globals": true, // détecte test/expect de Playwright
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base", // style Airbnb de base
  ],
  rules: {
    "no-console": "off", // autoriser console.log dans les tests
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-underscore-dangle": "off",
  },
};
