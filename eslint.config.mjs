import js from '@eslint/js';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      'allure-results',
      'allure-report',
      'playwright-report',
      'test-results',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: parserTs,
    },
    plugins: {
      '@typescript-eslint': pluginTs,
    },
    rules: {
      // You may add stricter TS rules here as needed:
      // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // '@typescript-eslint/no-explicit-any': 'off'
    },
  },
];
