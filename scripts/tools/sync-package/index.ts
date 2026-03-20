import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { ENCODING_UTF_8 } from '../../constants'

const contentValues = {
  core: 'This is the core package of cotton-box.',
  react: 'This is the official React bindings for cotton-box.',
} as const

export function syncPackage(packageLabel: keyof typeof contentValues): void {

  if (!packageLabel) {
    throw new Error('Missing mandatory argument: `packageLabel`')
  }

  copyFileSync('../../../LICENSE', './LICENSE')

  const rootReadme = readFileSync('../../../README.md', ENCODING_UTF_8)

  const contentValue = contentValues[packageLabel]
  const subPackageReadmeContents = rootReadme.replace(
    '<!--:DO_NOT_DELETE_THIS_LINE_SUB_PACKAGE_ADDITIONAL_INFO:-->',
    `<div style="background-color: #2b80ff20; border-inline-start: solid 5px #2b80ff; padding-inline-start: 10px; padding-block: 5px; margin-block: 20px">${contentValue}</div>\n<br/>`,
  )
  writeFileSync('./README.md', subPackageReadmeContents, ENCODING_UTF_8)

}
