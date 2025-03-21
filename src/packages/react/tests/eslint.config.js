const { Severity } = require('@glyph-cat/eslint-config')

module.exports = {
  rules: {
    '@typescript-eslint/no-unused-vars': Severity.WARN,
    'import/no-unresolved': [Severity.ERROR, {
      // not sure why it is not able to resolve this package
      ignore: ['react-dom/server'],
    }],
    'no-console': Severity.OFF,
  }
}
