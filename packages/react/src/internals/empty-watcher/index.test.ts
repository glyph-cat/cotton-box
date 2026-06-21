import { emptyWatcher } from '.'

test(emptyWatcher.name, () => {
  expect(() => {
    const unwatch = emptyWatcher()
    unwatch()
  }).not.toThrow()
})
