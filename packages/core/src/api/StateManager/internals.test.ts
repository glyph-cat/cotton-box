import {
  getErrorMessageForOverlappingInits,
  getErrorMessageForRepeatedInitCommits,
  getErrorMessageForSetOrResetDuringInitialization,
} from './internals'

describe(getErrorMessageForOverlappingInits.name, () => {

  test('Without name', () => {
    const output = getErrorMessageForOverlappingInits(undefined)
    expect(output).toBe('Cannot initialize state because the previous initialization is not yet complete.')
  })

  test('With name', () => {
    const output = getErrorMessageForOverlappingInits('TestState')
    expect(output).toBe('Cannot initialize "TestState" because the previous initialization is not yet complete.')
  })

})

describe(getErrorMessageForRepeatedInitCommits.name, () => {

  describe('commit', () => {

    test('Without name', () => {
      const output = getErrorMessageForRepeatedInitCommits(undefined, 'commit')
      expect(output).toBe('Attempted to call `commit` multiple times for the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('With name', () => {
      const output = getErrorMessageForRepeatedInitCommits('TestState', 'commit')
      expect(output).toBe('Attempted to call `commit` for "TestState" multiple times for the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

  })

  describe('commitNoop', () => {

    test('Without name', () => {
      const output = getErrorMessageForRepeatedInitCommits(undefined, 'commitNoop')
      expect(output).toBe('Attempted to call `commitNoop` multiple times for the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('With name', () => {
      const output = getErrorMessageForRepeatedInitCommits('TestState', 'commitNoop')
      expect(output).toBe('Attempted to call `commitNoop` for "TestState" multiple times for the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

  })

})

describe(getErrorMessageForSetOrResetDuringInitialization.name, () => {

  test('Without name', () => {
    const output = getErrorMessageForSetOrResetDuringInitialization(undefined)
    expect(output).toBe('Cannot set/reset while state is still initializing.')
  })

  test('With name', () => {
    const output = getErrorMessageForSetOrResetDuringInitialization('TestState')
    expect(output).toBe('Cannot set/reset while "TestState" is still initializing.')
  })

})
