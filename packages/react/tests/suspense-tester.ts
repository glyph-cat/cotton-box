import { RenderResult, render } from '@testing-library/react'
import { ComponentType, Suspense, act, createElement, useEffect } from 'react'
import { CleanupManager } from './test-helpers'

export class SuspenseTester {

  private renderResult: RenderResult = null
  private _componentIsUnderSuspense = false

  get componentIsUnderSuspense(): boolean {
    return this._componentIsUnderSuspense
  }

  constructor(
    TestComponent: ComponentType,
    cleanupManager: CleanupManager,
  ) {

    this.dispose = this.dispose.bind(this)
    if (cleanupManager) { cleanupManager.append(this.dispose) }

    const FallbackComponent = (): JSX.Element => {
      useEffect(() => {
        this._componentIsUnderSuspense = true
        return () => { this._componentIsUnderSuspense = false }
      }, [])
      return null
    }

    act(() => {
      this.renderResult = render(
        createElement(Suspense, {
          fallback: createElement(FallbackComponent),
        }, createElement(TestComponent))
      )
    })

  }

  dispose(): void {
    this.renderResult?.unmount()
  }

}
