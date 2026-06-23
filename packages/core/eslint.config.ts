import { Severity } from '@glyph-cat/eslint-config'
import { libraryAuthoring as baseLibraryAuthoring } from '@glyph-cat/eslint-config/base'
import { recommended as jestRecommended } from '@glyph-cat/eslint-config/jest'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

module.exports = defineConfig(
  baseLibraryAuthoring,
  jestRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-require-imports': Severity.OFF,
      '@typescript-eslint/no-explicit-any': Severity.OFF,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },
  {
    ignores: [
      '*/eslint.config.js',
      'config/rollup.config.js',
      'src/pages/examples/',
    ],
  },
)
