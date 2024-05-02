import { redBright } from 'chalk'
import { readFileSync, writeFileSync } from 'node:fs'
import { DocConstants } from '../../packages/docs/src/constants'
import { stringMap } from '../../packages/docs/src/utils/string-map'
import { ENCODING_UTF_8 } from '../constants'

function run(packageName: string, variablePool: Record<string, string>): void {

  if (!packageName) { throw new Error('Package name not specified') }

  const packageInfo = JSON.parse(readFileSync(`./packages/${packageName}/package.json`, ENCODING_UTF_8))
  const typeDefinitionPath = `./packages/${packageName}/${packageInfo.types}`

  let typeDefinitionBody = readFileSync(typeDefinitionPath, ENCODING_UTF_8)
  const { unusedVariables, data } = stringMap(typeDefinitionBody, variablePool, true)
  typeDefinitionBody = data

  if (/localhost:3000/.test(typeDefinitionBody)) {
    console.log(redBright('Parsed type definition body contains "localhost"'))
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
    console.log(redBright(`Undefined doc variables: ${unparsedVariables.join(', ')}`))
    process.exit(1)
  }

}

run(process.argv[2], Object.freeze(DocConstants))
