// const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  rules: {
    '@typescript-eslint/no-unused-vars': WARN,
    'import/no-unresolved': [ERROR, {
      // not sure why it is not able to resolve this package
      ignore: ['react-dom/server'],
    }],
    'no-console': WARN,
  }
}
