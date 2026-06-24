import { renderHook } from '@testing-library/react-hooks'

export interface CustomRenderResultMetadata {
  renderCount: number
}

export interface CustomRenderHookResult<TProps, TResult> extends ReturnType<typeof renderHook<TProps, TResult>> {
  meta: CustomRenderResultMetadata
}

export function customRenderHook<TProps, TResult>(
  ...args: Parameters<typeof renderHook<TProps, TResult>>
): CustomRenderHookResult<TProps, TResult> {
  const [callback, ...remainingArgs] = args
  const customResult = {
    ...renderHook((...renderArgs) => {
      customResult.meta.renderCount += 1
      return callback(...renderArgs)
    }, ...remainingArgs),
    meta: { renderCount: 0 },
  }
  return customResult
}

export * from '@testing-library/react-hooks'
