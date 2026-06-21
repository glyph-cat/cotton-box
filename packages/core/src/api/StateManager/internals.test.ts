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

  describe('With name', () => {

    test('commit -> commit', () => {
      const output = getErrorMessageForRepeatedInitCommits('TestState', 'commit', 'commit')
      expect(output).toBe('Attempted to call `commit` for "TestState" multiple times in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('commit -> commitNoop', () => {
      const output = getErrorMessageForRepeatedInitCommits('TestState', 'commit', 'commitNoop')
      expect(output).toBe('Attempted to call `commit` for "TestState" even though `commitNoop` has already been called in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('commitNoop -> commit', () => {
      const output = getErrorMessageForRepeatedInitCommits('TestState', 'commitNoop', 'commit')
      expect(output).toBe('Attempted to call `commitNoop` for "TestState" even though `commit` has already been called in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('commitNoop -> commitNoop', () => {
      const output = getErrorMessageForRepeatedInitCommits('TestState', 'commitNoop', 'commitNoop')
      expect(output).toBe('Attempted to call `commitNoop` for "TestState" multiple times in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

  })

  describe('Without name', () => {

    test('commit -> commit', () => {
      const output = getErrorMessageForRepeatedInitCommits(undefined, 'commit', 'commit')
      expect(output).toBe('Attempted to call `commit` multiple times in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('commit -> commitNoop', () => {
      const output = getErrorMessageForRepeatedInitCommits(undefined, 'commit', 'commitNoop')
      expect(output).toBe('Attempted to call `commit` even though `commitNoop` has already been called in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('commitNoop -> commit', () => {
      const output = getErrorMessageForRepeatedInitCommits(undefined, 'commitNoop', 'commit')
      expect(output).toBe('Attempted to call `commitNoop` even though `commit` has already been called in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
    })

    test('commitNoop -> commitNoop', () => {
      const output = getErrorMessageForRepeatedInitCommits(undefined, 'commitNoop', 'commitNoop')
      expect(output).toBe('Attempted to call `commitNoop` multiple times in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.')
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
