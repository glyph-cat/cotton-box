import { readFileSync, writeFileSync } from 'fs'
import { ENCODING_UTF_8 } from '../../constants'

const packageInfo = JSON.parse(readFileSync('./package.json', ENCODING_UTF_8))
const typeDefinitionPath = `./${packageInfo.types}`

let typeDefinitionBody = readFileSync(typeDefinitionPath, ENCODING_UTF_8)

interface IReplacement {
  source: string
  replaceFn(source: string): string
}

const replacements: Array<IReplacement> = [
  {
    source: 'get(): Promise<State>;',
    replaceFn: (source) => `//@ts-ignore\n    ${source}`,
  },
  {
    source: 'readonly type = "StateManager";',
    replaceFn: (source) => `//@ts-ignore\n    ${source}`,
  },
  {
    source: 'readonly type = "AsyncStateManager";',
    replaceFn: (source) => `//@ts-ignore\n    ${source}`,
  },
]

for (const replacement of replacements) {
  typeDefinitionBody = typeDefinitionBody.replace(
    replacement.source,
    replacement.replaceFn(replacement.source)
  )
}

writeFileSync(typeDefinitionPath, typeDefinitionBody, ENCODING_UTF_8)
