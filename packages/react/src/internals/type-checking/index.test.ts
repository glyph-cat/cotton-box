import { isUndefined } from '.'

describe(isUndefined.name, () => {

  test('With `undefined`', () => {
    const output = isUndefined(undefined)
    expect(output).toBe(true)
  })

  test('With `null`', () => {
    const output = isUndefined(null)
    expect(output).toBe(false)
  })

  test('With an object', () => {
    const output = isUndefined(42)
    expect(output).toBe(false)
  })

})
