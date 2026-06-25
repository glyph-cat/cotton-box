import { renderHook } from '@testing-library/react'
import { createElement, PropsWithChildren, Suspense, useEffect } from 'react'

export interface CustomRenderResultMetadata {
  renderCount: number
}

export interface CustomRenderHookResult<TProps, TResult> extends ReturnType<typeof renderHook<TProps, TResult>> {
  meta: CustomRenderResultMetadata
}

export function customRenderHook<TProps, TResult>(
  ...args: Parameters<typeof renderHook<TProps, TResult>>
): CustomRenderHookResult<TProps, TResult> {

  const meta = { renderCount: 0 }

  const [callback, ...remainingArgs] = args
  const hook = renderHook((...renderArgs) => {
    meta.renderCount += 1
    return callback(...renderArgs)
  }, ...remainingArgs)

  return {
    ...hook,
    meta,
  }

}

export interface CustomSuspenseTesterResultMetadata extends CustomRenderResultMetadata {
  isSuspended(): boolean
}

export interface CustomSuspenseTesterResult<TProps, TResult> extends Omit<CustomRenderHookResult<TProps, TResult>, 'meta'> {
  meta: CustomSuspenseTesterResultMetadata
}

export function renderSuspenseTester<TProps, TResult>(
  ...args: Parameters<typeof customRenderHook<TProps, TResult>>
): CustomSuspenseTesterResult<TProps, TResult> {

  let isSuspended = false

  const FallbackComponent = (): undefined => {
    useEffect(() => {
      isSuspended = true
      return () => { isSuspended = false }
    }, [])
  }

  const wrapper = ({ children }: PropsWithChildren) => (
    createElement(Suspense, {
      fallback: createElement(FallbackComponent),
    }, children)
  )

  const [callback, options, ...remainingArgs] = args
  const hook = customRenderHook<TProps, TResult>(callback, {
    ...options,
    wrapper,
  }, ...remainingArgs)

  return {
    ...hook,
    meta: {
      ...hook.meta,
      isSuspended: () => isSuspended,
    },
  }

}

export * from '@testing-library/react'
