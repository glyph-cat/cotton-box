import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  ReactLib: { NO_STATE, hasNoState, hasState },
}: TestConfig) => {

  test('hasNoState', () => {
    expect(hasNoState(NO_STATE)).toBe(true)
    expect(hasNoState(Symbol('NO_STATE'))).toBe(false)
    expect(hasNoState(null)).toBe(false)
    expect(hasNoState(undefined)).toBe(false)
    expect(hasNoState(42)).toBe(false)
    expect(hasNoState('foo')).toBe(false)
    expect(hasNoState('')).toBe(false)
    expect(hasNoState([])).toBe(false)
    expect(hasNoState({})).toBe(false)
    expect(hasNoState(new Date())).toBe(false)
    expect(hasNoState(false)).toBe(false)
    expect(hasNoState(true)).toBe(false)
  })

  test('hasState', () => {
    expect(hasState(NO_STATE)).toBe(false)
    expect(hasState(Symbol('NO_STATE'))).toBe(true)
    expect(hasState(null)).toBe(true)
    expect(hasState(undefined)).toBe(true)
    expect(hasState(42)).toBe(true)
    expect(hasState('foo')).toBe(true)
    expect(hasState('')).toBe(true)
    expect(hasState([])).toBe(true)
    expect(hasState({})).toBe(true)
    expect(hasState(new Date())).toBe(true)
    expect(hasState(false)).toBe(true)
    expect(hasState(true)).toBe(true)
  })

})
