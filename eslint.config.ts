import { Severity } from '@glyph-cat/eslint-config'
import { libraryAuthoring as baseLibraryAuthoring } from '@glyph-cat/eslint-config/base'
import { recommended as jestRecommended } from '@glyph-cat/eslint-config/jest'
import { libraryAuthoring as reactLibraryAuthoring } from '@glyph-cat/eslint-config/react'
import { defineConfig } from 'eslint/config'

module.exports = defineConfig(
  baseLibraryAuthoring,
  reactLibraryAuthoring,
  jestRecommended,
  {
    rules: {
      '@typescript-eslint/no-require-imports': Severity.OFF,
      '@typescript-eslint/no-explicit-any': Severity.OFF,
    },
  },
  {
    settings: {
      react: {
        version: '19',
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
