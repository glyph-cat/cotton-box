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
        paths: [
          ...recommendedConfigs.rules['no-restricted-imports'][1].paths.filter((p) => {
            return p.name !== 'react'
          }),
          {
            name: '@docusaurus/Link',
            message: 'Please import { Link } from \'@site/src/components/custom-link\' instead',
          },
        ],
      }
    ],
    'react-hooks/exhaustive-deps': [WARN, {
      additionalHooks: '(useInsertionEffect)'
    }]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
