import type {
  SimpleStateManager as $0,
  StateManager as $1,
  AsyncStateManager as $2,
} from '../../src'
import { CleanupManager } from '../test-helpers'
import { TestConfig, wrapper } from '../test-wrapper'

type $ = $0<unknown> | $1<unknown> | $2<unknown>

let cleanupManager: CleanupManager
beforeEach(() => { cleanupManager = new CleanupManager() })
afterEach(() => { cleanupManager.performCleanup })

wrapper(({ Lib: {
  SimpleStateManager,
  StateManager,
  AsyncStateManager,
} }: TestConfig) => {

  // Name generator does not distinguish between different types of State Managers.
  test('Name Generator', async () => {

    const stateManagers: Array<$> = []
    stateManagers.push(new SimpleStateManager(null))
    stateManagers.push(new SimpleStateManager(null, { name: 'foo' }))
    stateManagers.push(new StateManager(null))
    stateManagers.push(new StateManager(null, { name: 'bar' }))
    stateManagers.push(new AsyncStateManager(null))
    stateManagers.push(new AsyncStateManager(null, { name: 'baz' }))
    stateManagers.push(new StateManager(null))
    stateManagers.push(new AsyncStateManager(null))
    stateManagers.push(new SimpleStateManager(null, { name: 'aaa' }))
    stateManagers.push(new StateManager(null, { name: 'bbb' }))
    stateManagers.push(new SimpleStateManager(null))
    stateManagers.push(new AsyncStateManager(null, { name: 'ccc' }))

    expect(stateManagers.map((s) => s.name)).toStrictEqual([
      'UnnamedStateManager_001',
      'foo',
      'UnnamedStateManager_002',
      'bar',
      'UnnamedStateManager_003',
      'baz',
      'UnnamedStateManager_004',
      'UnnamedStateManager_005',
      'aaa',
      'bbb',
      'UnnamedStateManager_006',
      'ccc',
    ])

  })

})
