import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({ Lib: { Equality } }: TestConfig) => {

  test('[], []', () => {
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareArray = jest.fn(Equality.shallowCompareArray)
    const isEqual = Equality.shallowCompareArrayOrObject([], [])
    expect(isEqual).toBe(true)
    expect(Equality.shallowCompareArray).toHaveBeenCalled()
  })

  test('[], {}', () => {
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareArray = jest.fn(Equality.shallowCompareArray)
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareObject = jest.fn(Equality.shallowCompareObject)
    const isEqual = Equality.shallowCompareArrayOrObject([], {})
    expect(isEqual).toBe(false)
    expect(Equality.shallowCompareArray).not.toHaveBeenCalled()
    expect(Equality.shallowCompareObject).not.toHaveBeenCalled()
  })

  test('{}, []', () => {
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareArray = jest.fn(Equality.shallowCompareArray)
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareObject = jest.fn(Equality.shallowCompareObject)
    const isEqual = Equality.shallowCompareArrayOrObject({}, [])
    expect(isEqual).toBe(false)
    expect(Equality.shallowCompareArray).not.toHaveBeenCalled()
    expect(Equality.shallowCompareObject).not.toHaveBeenCalled()
  })

  test('{}, {}', () => {
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareObject = jest.fn(Equality.shallowCompareObject)
    const isEqual = Equality.shallowCompareArrayOrObject({}, {})
    expect(isEqual).toBe(true)
    expect(Equality.shallowCompareObject).toHaveBeenCalled()
  })

  test('{}, primitive type', () => {
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareArray = jest.fn(Equality.shallowCompareArray)
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareObject = jest.fn(Equality.shallowCompareObject)
    const isEqual = Equality.shallowCompareArrayOrObject({}, 'hello')
    expect(isEqual).toBe(false)
    expect(Equality.shallowCompareObject).toHaveBeenCalled()
  })

  test('[], primitive type', () => {
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareArray = jest.fn(Equality.shallowCompareArray)
    // @ts-expect-error: Done on purpose for testing.
    Equality.shallowCompareObject = jest.fn(Equality.shallowCompareObject)
    const isEqual = Equality.shallowCompareArrayOrObject([], 'hello')
    expect(isEqual).toBe(false)
    expect(Equality.shallowCompareArray).not.toHaveBeenCalled()
    expect(Equality.shallowCompareObject).not.toHaveBeenCalled()
  })

  describe('primitive type, primitive type', () => {

    test('Should be equal', () => {
      // @ts-expect-error: Done on purpose for testing.
      Equality.shallowCompareArray = jest.fn(Equality.shallowCompareArray)
      // @ts-expect-error: Done on purpose for testing.
      Equality.shallowCompareObject = jest.fn(Equality.shallowCompareObject)
      const isEqual = Equality.shallowCompareArrayOrObject('hello', 'hello')
      expect(isEqual).toBe(true)
      expect(Equality.shallowCompareObject).toHaveBeenCalled()
    })

    test('Should not be equal', () => {
      // @ts-expect-error: Done on purpose for testing.
      Equality.shallowCompareArray = jest.fn(Equality.shallowCompareArray)
      // @ts-expect-error: Done on purpose for testing.
      Equality.shallowCompareObject = jest.fn(Equality.shallowCompareObject)
      const isEqual = Equality.shallowCompareArrayOrObject('hello', 'world')
      expect(isEqual).toBe(false)
      expect(Equality.shallowCompareObject).toHaveBeenCalled()
    })

  })

})
