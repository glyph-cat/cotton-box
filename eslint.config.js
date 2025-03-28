const { Severity } = require('@glyph-cat/eslint-config')
const { libraryAuthoring: baseLibraryAuthoring } = require('@glyph-cat/eslint-config/base')
const { libraryAuthoring: reactLibraryAuthoring } = require('@glyph-cat/eslint-config/react')
const { recommended: jestRecommended } = require('@glyph-cat/eslint-config/jest')

module.exports = [
  ...baseLibraryAuthoring,
  ...jestRecommended,
  ...reactLibraryAuthoring,
  {
    rules: {
      '@typescript-eslint/no-require-imports': Severity.OFF,
      '@typescript-eslint/no-explicit-any': Severity.OFF,
    },
  },
  {
    ignores: [
      '*/eslint.config.js',
      'config/rollup.config.js',
      'src/pages/examples/',
    ],
  },
]
