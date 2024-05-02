const { configs } = require('@glyph-cat/eslint-config')

const strictConfigs = configs.strict

const OFF = 0
// const WARN = 1
// const ERROR = 2

module.exports = {
  root: true,
  ...strictConfigs,
  plugins: [
    ...strictConfigs.plugins,
    'jest',
  ],
  rules: {
    ...strictConfigs.rules,
    '@typescript-eslint/no-explicit-any': OFF,
    'jest/valid-title': OFF,
    'no-restricted-imports': [
      strictConfigs.rules['no-restricted-imports'][0], {
        ...strictConfigs.rules['no-restricted-imports'][1],
        paths: [
          ...strictConfigs.rules['no-restricted-imports'][1].paths.filter((p) => {
            return p.name !== 'react'
          }),
          // {
          //   name: 'cotton-box',
          //   message: 'Please import from \'core-package-alias\' instead.',
          // },
        ],
      }
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        // Reference: https://stackoverflow.com/a/75368733/5810737
      },
    },
    jest: {
      version: require('jest/package.json').version,
    },
    react: {
      version: 'detect',
    },
  },
}
