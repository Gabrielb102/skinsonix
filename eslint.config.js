import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/electron",
    "plugin:import/typescript",
    "plugin:vue/vue3-essential"
  ],
  "parser": vueParser,
  "parserOptions": {
    "parser": tsParser,
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    },
    "alias": {
      "map": [
        ["@", "./src"],
        ["@components", "./src/frontend/components"]
      ],
      "extensions": [".ts", ".js", ".jsx", ".json", ".vue"]
    }
  }
}