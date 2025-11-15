import storybook from 'eslint-plugin-storybook'
import { tanstackConfig } from '@tanstack/eslint-config'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    ignores: ['.storybook/**', 'eslint.config.js', 'prettier.config.js'],
  },
  {
    plugins: {
      'react-hooks': reactHooks,
    },
  },
  ...tanstackConfig,
  ...storybook.configs['flat/recommended'],
  reactHooks.configs.flat.recommended,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/purity': 'off',
      'import/order': 'off',
      'no-shadow': 'off',
      'import/consistent-type-specifier-style': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
    },
  },
]
