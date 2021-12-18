module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest/globals": true,
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react",
    "jest",
    "@typescript-eslint",
  ],
  "rules": {
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "no-undef": "warn",
    "space-before-blocks": ["warn", { "functions": "always" }],
    "no-unused-vars": "off",
  }
};