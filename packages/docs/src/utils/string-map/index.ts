export interface StringMapResults {
  data: string
  unusedVariables: Array<string>
}

export function stringMap(
  data: string,
  variablePool: Record<string, string>,
  isTSDoc: boolean
): StringMapResults {

  if (!data) {
    return {
      data: '',
      unusedVariables: [],
    }
  } // Early exit

  const unusedVariables: Array<string> = []

  for (const key in variablePool) {
    const pattern = `-?{:${key}:}`
    // `@returns {:KEY:}` will cause some ts-docs parsing inaccuracies, so a dash
    // is added to the front of the opening bracket (without space).
    const matchCount = (data.match(new RegExp(pattern, 'g')) ?? []).length
    if (matchCount > 0) {
      let parsedVariable = variablePool[key]
      if (isTSDoc) {
        parsedVariable = removeTrailingSpacesFromEachLine(parsedVariable.replace(/\n/g, '\n * '))
      }
      data = data.replace(
        new RegExp(pattern, 'g'),
        parsedVariable
      )
    } else {
      unusedVariables.push(key)
    }
  }

  return {
    data,
    unusedVariables,
  }

}

function removeTrailingSpacesFromEachLine(value: string): string {
  const lines = value.split('\n')
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(/\s+$/, '')
  }
  return lines.join('\n')
}
