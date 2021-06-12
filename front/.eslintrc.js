module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react"],
  "rules": {
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "no-undef": "warn",
    "space-before-blocks": ["warn", { "functions": "always" }],
    "no-unused-vars": "off"
  }
};