const { Severity } = require('@glyph-cat/eslint-config')
const { recommended: baseRecommended } = require('@glyph-cat/eslint-config/base')
const { recommended: reactRecommended } = require('@glyph-cat/eslint-config/react')
const docusaurusPlugin = require('@docusaurus/eslint-plugin')

const baseIndexToModify = baseRecommended.findIndex((item) => {
  return item.name === '@glyph-cat/eslint-config (base)'
})

baseRecommended[baseIndexToModify] = {
  ...baseRecommended[baseIndexToModify],
  rules: {
    ...baseRecommended[baseIndexToModify].rules,
    '@typescript-eslint/no-require-imports': Severity.OFF,
    'import/no-unresolved': [Severity.ERROR, {
      // Reference: https://stackoverflow.com/a/70089592/5810737
      ignore: [
        '@docusaurus',
        '@site',
        '@theme',
      ],
    }],
    'no-restricted-imports': [
      baseRecommended[baseIndexToModify].rules['no-restricted-imports'][0],
      {
        ...baseRecommended[baseIndexToModify].rules['no-restricted-imports'][1],
        paths: [
          ...baseRecommended[baseIndexToModify].rules['no-restricted-imports'][1].paths,
          {
            name: '@docusaurus/Link',
            message: 'Please import { Link } from \'@site/src/components/custom-link\' instead',
          },
        ],
      },
    ],
  },
}

const reactIndexToModify = reactRecommended.findIndex((item) => {
  return item.name === '@glyph-cat/eslint-config (react)'
})

reactRecommended[reactIndexToModify] = {
  ...reactRecommended[reactIndexToModify],
  rules: {
    ...reactRecommended[reactIndexToModify].rules,
    'no-restricted-imports': [Severity.ERROR, {
      paths: [],
    }],
  },
}

module.exports = [
  ...baseRecommended,
  ...reactRecommended,
  {
    plugins: {
      'docusaurus': docusaurusPlugin,
    },
  },
  {
    ignores: [
      '*/eslint.config.js',
      '.docusaurus',
      'src/examples/',
    ],
  },
]
