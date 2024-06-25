import { getAutomaticName } from '.'

test(getAutomaticName.name, () => {
  expect(getAutomaticName()).toBe('UnnamedStateManager_001')
  expect(getAutomaticName()).toBe('UnnamedStateManager_002')
  expect(getAutomaticName()).toBe('UnnamedStateManager_003')
})
