import { readFileSync, writeFileSync } from 'node:fs'
import { ENCODING_UTF_8 } from '../constants'

const packageInfo = JSON.parse(readFileSync('./package.json', ENCODING_UTF_8))
const typeDefinitionPath = `./${packageInfo.types}`

let typeDefinitionBody = readFileSync(typeDefinitionPath, ENCODING_UTF_8)

const matchString = 'get(): Promise<State>;'
typeDefinitionBody = typeDefinitionBody.replace(
  matchString,
  `//@ts-ignore\n    ${matchString}`
)

writeFileSync(typeDefinitionPath, typeDefinitionBody, ENCODING_UTF_8)
