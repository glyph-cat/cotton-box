import { CleanupManager, HookInterface, TestUtils } from '../../test-helpers'
import { TestConfig, wrapper } from '../../test-wrapper'

wrapper(({
  Lib: { StateManager, AsyncStateManager },
  ReactLib: { useInitState },
}: TestConfig) => {

  const cleanupManager = new CleanupManager()
  afterEach(cleanupManager.performCleanup)

  jest.useRealTimers()

  test('StateManager', async () => {

    let commitNoopRef: (() => void) = null
    const TestState = new StateManager({
      default: null,
      lifecycle: {
        init({ commitNoop }) {
          commitNoopRef = commitNoop
        },
      },
    })
    cleanupManager.append(TestState.dispose)

    const hookInterface = new HookInterface({
      cleanupManager,
      useHook: () => useInitState(TestState),
      values: {
        isInitializing(state) { return state },
      },
      actions: {
        completeFirstInit() { commitNoopRef() },
        async initAgain() {
          await TestState.init(async ({ commitNoop }) => {
            await TestUtils.delay(10)
            commitNoop()
          })
        }
      },
    })

    expect(hookInterface.get('isInitializing')).toBe(true)
    await hookInterface.action('completeFirstInit')
    expect(hookInterface.get('isInitializing')).toBe(false)

    await hookInterface.action('initAgain')
    expect(hookInterface.get('isInitializing')).toBe(true)
    await TestUtils.delay(10)
    expect(hookInterface.get('isInitializing')).toBe(false)

  })

  test('AsyncStateManager', async () => {

    let commitNoopRef: (() => void) = null
    const TestState = new AsyncStateManager({
      default: null,
      lifecycle: {
        init({ commitNoop }) {
          commitNoopRef = commitNoop
        },
      },
    })
    cleanupManager.append(TestState.dispose)

    const hookInterface = new HookInterface({
      cleanupManager,
      useHook: () => useInitState(TestState),
      values: {
        isInitializing(state) { return state },
      },
      actions: {
        completeFirstInit() { commitNoopRef() },
        async initAgain() {
          await TestState.init(async ({ commitNoop }) => {
            await TestUtils.delay(10)
            commitNoop()
          })
        }
      },
    })

    expect(hookInterface.get('isInitializing')).toBe(true)
    await hookInterface.action('completeFirstInit')
    expect(hookInterface.get('isInitializing')).toBe(false)

    await hookInterface.action('initAgain')
    expect(hookInterface.get('isInitializing')).toBe(true)
    await TestUtils.delay(10)
    expect(hookInterface.get('isInitializing')).toBe(false)

  })

})
