export function concatClassNames(...classNames: Array<string>): string {
  let concatenatedClassNames = ''
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i]
    if (className) {
      concatenatedClassNames += className
      if (i < classNames.length - 1) {
        concatenatedClassNames += ' '
      }
    }
  }
  return concatenatedClassNames
}
