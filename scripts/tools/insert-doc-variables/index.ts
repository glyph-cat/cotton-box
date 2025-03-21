import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'fs'
import { DocConstants } from '../../../src/packages/docs/src/constants'
import { stringMap } from '../../../src/packages/docs/src/utils/string-map'

const ENCODING_UTF_8 = 'utf-8' // temp
const variablePool = DocConstants // temp

export function insertDocVariables(): void {

  const packageInfo = JSON.parse(readFileSync('./package.json', ENCODING_UTF_8))
  const typeDefinitionPath = `./${packageInfo.types}`

  let typeDefinitionBody = readFileSync(typeDefinitionPath, ENCODING_UTF_8)
  const { unusedVariables, data } = stringMap(typeDefinitionBody, variablePool, true)
  typeDefinitionBody = data

  if (/localhost:3000/.test(typeDefinitionBody)) {
    console.log(chalk.redBright('Parsed type definition body contains "localhost"'))
    process.exit(1)
  }
  writeFileSync(typeDefinitionPath, typeDefinitionBody, ENCODING_UTF_8)

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
    console.log(chalk.redBright(`Undefined doc variables: ${unparsedVariables.join(', ')}`))
    process.exit(1)
  }

}
