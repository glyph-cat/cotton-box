import { readFileSync, writeFileSync } from 'fs'
import { ENCODING_UTF_8 } from '../../constants'

const contentValues = {
  core: 'This is the core package of cotton-box.',
  react: 'This is the official React bindings for cotton-box.',
} as const

let sourceReadmeContents = readFileSync('./README.md', ENCODING_UTF_8)

for (const packageName in contentValues) {
  const contentValue = contentValues[packageName]
  const subPackageReadmeContents = sourceReadmeContents.replace(
    '<!--:DO_NOT_DELETE_THIS_LINE_SUB_PACKAGE_ADDITIONAL_INFO:-->',
    `<div style="background-color: #2b80ff20; border-inline-start: solid 5px #2b80ff; padding-inline-start: 10px; padding-block: 5px; margin-block: 20px">${contentValue}</div>`,
  )
  writeFileSync(
    `./packages/${packageName}/README.md`,
    subPackageReadmeContents,
    ENCODING_UTF_8,
  )
}
