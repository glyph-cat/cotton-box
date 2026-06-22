import { Encoding } from '@glyph-cat/foundation'
import chalk from 'chalk'
import { DocConstants, stringMap } from 'cotton-box-doc-utils'
import { readFile, writeFile } from 'node:fs/promises'
import { PackageJson } from 'type-fest'

interface IBundle {
  BUILD_HASH: string
  VERSION: string
}

export async function insertDocVariables(bundle: IBundle): Promise<void> {

  const packageInfo = JSON.parse(await readFile('./package.json', Encoding.UTF_8)) as PackageJson
  const typeDefinitionPath = `./${packageInfo.types}`

  const VARIABLE_POOL = {
    ...DocConstants,
    PACKAGE_BUILD_HASH: bundle.BUILD_HASH,
    PACKAGE_VERSION: bundle.VERSION,
  }

  let typeDefinitionBody = await readFile(typeDefinitionPath, Encoding.UTF_8)
  const { unusedVariables, data } = stringMap(typeDefinitionBody, VARIABLE_POOL, true)
  typeDefinitionBody = data

  if (/localhost:3000/.test(typeDefinitionBody)) {
    // Some values in DocConstants contains values that are determined by `process.env.NODE_ENV`.
    // This issue can most likely be fixed by adding `NODE_ENV=production` to the shell script.
    console.log(chalk.redBright('Parsed type definition body contains "localhost"'))
    process.exit(1)
  }
  await writeFile(typeDefinitionPath, typeDefinitionBody, Encoding.UTF_8)

  if (unusedVariables.length > 0) {
    // TOFIX: [Low priority] Some variables are only used in core and some in react, so this becomes inaccurate
    // console.log(yellow(`Unused variables: ${unusedVariables.join(', ')}`))
  }

  let unparsedVariables: Array<string> = typeDefinitionBody.match(/-?{:[a-z0-9_-]+:}/gi) || []
  unparsedVariables = [...new Set(unparsedVariables)]
  if (unparsedVariables.length > 0) {
    for (let i = 0; i < unparsedVariables.length; i++) {
      unparsedVariables[i] = unparsedVariables[i].replace(/^-?{:/, '').replace(/:}$/, '')
    }
    console.log(chalk.redBright(`Missing doc variables: ${unparsedVariables.join(', ')}`))
    process.exit(1)
  }

}
