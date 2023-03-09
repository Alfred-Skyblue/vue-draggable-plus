// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    es2021: true
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
    ecmaVersion: 2021
  },
  rules: {
    'no-debugger': ['error'],
    'node/no-unpublished-require': 0,
    'node/no-extraneous-import': 0,
    'node/no-extraneous-require': 0,
    'node/no-missing-import': 0,
    'node/no-missing-require': 0,
    'no-undef': 0,
    'node/no-unpublished-import': 0,
    'node/no-unsupported-features/es-syntax': 0,
    'no-process-exit': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-constant-condition': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-extra-semi': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  }
})
