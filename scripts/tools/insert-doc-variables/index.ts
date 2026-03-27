import { Encoding } from '@glyph-cat/foundation'
import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'
import * as VARIABLE_POOL from '../../../src/packages/docs/src/constants/doc'
import { stringMap } from '../../../src/packages/docs/src/utils/string-map'

export function insertDocVariables(): void {

  const packageInfo = JSON.parse(readFileSync('./package.json', Encoding.UTF_8))
  const typeDefinitionPath = `./${packageInfo.types}`

  let typeDefinitionBody = readFileSync(typeDefinitionPath, Encoding.UTF_8)
  const { unusedVariables, data } = stringMap(typeDefinitionBody, VARIABLE_POOL, true)
  typeDefinitionBody = data

  if (/localhost:3000/.test(typeDefinitionBody)) {
    // Some values in DocConstants contains values that are determined by `process.env.NODE_ENV`.
    // This issue can most likely be fixed by adding `NODE_ENV=production` to the shell script.
    console.log(chalk.redBright('Parsed type definition body contains "localhost"'))
    process.exit(1)
  }
  writeFileSync(typeDefinitionPath, typeDefinitionBody, Encoding.UTF_8)

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
