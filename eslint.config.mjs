import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import { jsdoc } from 'eslint-plugin-jsdoc';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['dist/**/*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
  }),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  jsdoc({
    config: 'flat/recommended-typescript',
  }),
  {
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array-simple',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',

      'jsdoc/require-param-description': 'off',
      'jsdoc/require-jsdoc': 'off',
    },
  },
);
