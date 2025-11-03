import storybook from 'eslint-plugin-storybook'
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: ['.storybook/**', 'eslint.config.js', 'prettier.config.js'],
  },
  ...tanstackConfig,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'import/order': 'off',
      'no-shadow': 'off',
      'import/consistent-type-specifier-style': 'off',
      'sort-imports': 'off',
    },
  },
]
