// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/base'
  ],
  plugins: ['import'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  rules: {
    'no-debugger': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-extraneous-require': 'off',
    'node/no-missing-import': 'off',
    'node/no-missing-require': 'off',
    'no-undef': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'no-process-exit': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
