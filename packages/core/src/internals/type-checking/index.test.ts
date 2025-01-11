import { isFunction, isNull, isObject } from '.'

describe(isFunction.name, () => {

  test('With a function', () => {
    const output = isFunction(() => { /* */ })
    expect(output).toBe(true)
  })

  test('With a non-function', () => {
    const output = isFunction(42)
    expect(output).toBe(false)
  })

  test('With a falsy value', () => {
    const output = isFunction(undefined)
    expect(output).toBe(false)
  })

})

describe(isNull.name, () => {

  test('With `null`', () => {
    const output = isNull(null)
    expect(output).toBe(true)
  })

  test('With `undefined`', () => {
    const output = isNull(undefined)
    expect(output).toBe(false)
  })

  test('With an object', () => {
    const output = isNull(42)
    expect(output).toBe(false)
  })

})

describe(isObject.name, () => {

  test('Plain object', () => {
    const output = isObject({ hello: 'world' })
    expect(output).toBe(true)
  })

  test('Class instance', () => {
    const output = isObject(new Date())
    expect(output).toBe(true)
  })

  test('Something else', () => {
    const output = isObject(42)
    expect(output).toBe(false)
  })

})
