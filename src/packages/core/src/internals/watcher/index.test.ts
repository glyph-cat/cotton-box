import { Watcher } from '.'

let watcher: Watcher<number>

beforeEach(() => { watcher = new Watcher() })
afterEach(() => { watcher?.M$dispose() })

test('Happy Path', () => {

  const watchFn1 = jest.fn()
  const unwatchFn1 = watcher.M$watch(watchFn1)
  const watchFn2 = jest.fn()
  watcher.M$watch(watchFn2)

  watcher.M$post(42)
  expect(watchFn1).toHaveBeenCalledOnce()
  expect(watchFn1).toHaveBeenNthCalledWith(1, 42)
  expect(watchFn2).toHaveBeenCalledOnce()
  expect(watchFn2).toHaveBeenNthCalledWith(1, 42)

  unwatchFn1()
  watcher.M$post(43)
  expect(watchFn1).toHaveBeenCalledOnce() // Still, only once
  expect(watchFn2).toHaveBeenCalledTimes(2)
  expect(watchFn2).toHaveBeenNthCalledWith(2, 43)

  watcher.M$unwatchAll()
  watcher.M$post(44)
  expect(watchFn1).toHaveBeenCalledOnce() // Still, only once
  expect(watchFn2).toHaveBeenCalledTimes(2) // Still, only twice

})

test(Watcher.prototype.M$unwatchAll.name, () => {

  const watchFn1 = jest.fn()
  watcher.M$watch(watchFn1)
  const watchFn2 = jest.fn()
  watcher.M$watch(watchFn2)

  expect(watchFn1).not.toHaveBeenCalled()
  expect(watchFn2).not.toHaveBeenCalled()

  expect(() => {
    // Multiple invocations should not throw error
    watcher.M$unwatchAll()
    watcher.M$unwatchAll()
    watcher.M$unwatchAll()
  }).not.toThrow()

  const watchFn3 = jest.fn()
  watcher.M$watch(watchFn3)
  watcher.M$post(42)

  // Watch handlers added after calling `M$unwatchAll` should still be valid.
  expect(watchFn3).toHaveBeenCalledOnce()
  expect(watchFn3).toHaveBeenNthCalledWith(1, 42)

})

test(Watcher.prototype.M$dispose.name, () => {

  const watchFn1 = jest.fn()
  watcher.M$watch(watchFn1)
  const watchFn2 = jest.fn()
  watcher.M$watch(watchFn2)

  expect(watchFn1).not.toHaveBeenCalled()
  expect(watchFn2).not.toHaveBeenCalled()

  expect(() => {
    // Multiple invocations should not throw error
    watcher.M$dispose()
    watcher.M$dispose()
    watcher.M$dispose()
  }).not.toThrow()

  const watchFn3 = jest.fn()
  watcher.M$watch(watchFn3)
  watcher.M$post(42)

  // Watch handlers added after calling `M$dispose` should not be called.
  expect(watchFn3).not.toHaveBeenCalled()

})
