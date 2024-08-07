const { recommended: baseRecommended } = require('@glyph-cat/eslint-config/base')
const { recommended: reactRecommended } = require('@glyph-cat/eslint-config/react')

module.exports = [
  ...baseRecommended,
  ...reactRecommended,
  {
    ignores: [
      'src/pages/examples/',
      'eslint.config.js',
    ],
  },
]
