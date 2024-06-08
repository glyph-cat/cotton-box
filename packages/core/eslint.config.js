const { Severity } = require('@glyph-cat/eslint-config')
const { libraryAuthoring: baseLibraryAuthoring } = require('@glyph-cat/eslint-config/base')
const { recommended: jestRecommended } = require('@glyph-cat/eslint-config/jest')

module.exports = [
  ...baseLibraryAuthoring,
  ...jestRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': Severity.OFF,
    },
  },
]
