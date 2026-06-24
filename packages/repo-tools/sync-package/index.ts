import { Encoding } from '@glyph-cat/foundation'
import { copyFile, readFile, writeFile } from 'node:fs/promises'
import { basename } from 'node:path'

export async function syncPackage(): Promise<void> {

  const contentValues: Record<string, string> = {
    core: 'This is the core package of cotton-box.',
    react: 'This is the official React bindings for cotton-box.',
  }

  const packageDirName = basename(process.cwd())
  const contentValue = contentValues[packageDirName] || (() => {
    throw new Error(`Invalid package directory: "${packageDirName}"`)
  })()

  const [rootReadme] = await Promise.all([
    readFile('../../README.md', Encoding.UTF_8),
    copyFile('../../LICENSE', './LICENSE'),
  ])

  const subPackageReadmeContents = rootReadme.replace(
    '<!--:DO_NOT_DELETE_THIS_LINE_SUB_PACKAGE_ADDITIONAL_INFO:-->',
    `<div style="background-color: #2b80ff20; border-inline-start: solid 5px #2b80ff; padding-inline-start: 10px; padding-block: 5px; margin-block: 20px">${contentValue}</div>\n<br/>`,
  )

  await writeFile('./README.md', subPackageReadmeContents, Encoding.UTF_8)

}
