const { configs } = require('@glyph-cat/eslint-config')

const recommendedConfigs = configs.recommended

// const OFF = 0
const WARN = 1
// const ERROR = 2

module.exports = {
  root: true,
  ...recommendedConfigs,
  rules: {
    ...recommendedConfigs.rules,
    'no-restricted-imports': [
      recommendedConfigs.rules['no-restricted-imports'][0], {
        ...recommendedConfigs.rules['no-restricted-imports'][1],
        paths: recommendedConfigs.rules['no-restricted-imports'][1].paths.filter((p) => {
          return p.name !== 'react'
        }),
      }
    ],
    'react-hooks/exhaustive-deps': [WARN, {
      additionalHooks: '(useInsertionEffect)'
    }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    // See: https://github.com/benmosher/eslint-plugin-import/issues/1485#issuecomment-571597574
    react: {
      version: 'detect',
    },
  },
}
