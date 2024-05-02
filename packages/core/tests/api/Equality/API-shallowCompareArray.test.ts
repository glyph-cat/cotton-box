import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { Equality: { shallowCompareArray } } }: TestConfig) => {

  test('Empty array', () => {
    const isEqual = shallowCompareArray([], [])
    expect(isEqual).toBe(true)
  })

  describe('Different types', () => {

    test('undefined, []', () => {
      const isEqual = shallowCompareArray(undefined, [])
      expect(isEqual).toBe(false)
    })

    test('number, []', () => {
      const isEqual = shallowCompareArray(42, [])
      expect(isEqual).toBe(false)
    })

  })

  test('Differrent length', () => {
    const prevState = ['foo', 42]
    const nextState = ['foo', 'bar', 42]
    const isEqual = shallowCompareArray(prevState, nextState)
    expect(isEqual).toBe(false)
  })

  test('Same length, different items', () => {
    const prevState = ['foo', {}, 42]
    const nextState = ['foo', {}, 42]
    const isEqual = shallowCompareArray(prevState, nextState)
    expect(isEqual).toBe(false)
  })

  test('Same length, same items', () => {
    const OBJ = {}
    const prevState = ['foo', OBJ, 42]
    const nextState = ['foo', OBJ, 42]
    const isEqual = shallowCompareArray(prevState, nextState)
    expect(isEqual).toBe(true)
  })

})
