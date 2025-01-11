import { RenderResult, render } from '@testing-library/react'
import {
  ErrorInfo,
  Fragment,
  JSX,
  Component as ReactComponent,
  ReactNode,
  StrictMode,
  act,
  createElement,
  useEffect,
} from 'react'
import type { CleanupManager } from './test-helpers'

/**
 * @public
 */
export type HookFn<Params extends unknown[] = [], RType = void> = (...args: Params) => RType

/**
 * @public
 */
export type HookInterfaceActionDefinition<HookRType> = (arg: HookRType) => void | Promise<void>

/**
 * @public
 */
export type HookInterfaceValueMapper<HookRType> = (arg: HookRType) => unknown

/**
 * @public
 */
export class HookTester<
  HookParams extends unknown[],
  HookRType,
  Actions extends Record<string, HookInterfaceActionDefinition<HookRType>>,
  Values extends Record<string, HookInterfaceValueMapper<HookRType>>
> {

  private readonly useHook: HookFn<HookParams, HookRType>
  private readonly hookParameters: HookParams
  private readonly actions: Actions
  private readonly values: Values
  private _renderCount = 0
  private renderResult!: RenderResult
  private dispatchableActions: Partial<Record<keyof Actions, (() => void | Promise<void>)>> = {}
  private retrievableValues: Partial<Record<keyof Values, ReturnType<Values[keyof Values]>>> = {}

  readonly capturedErrors: Array<{ error: Error, errorInfo: ErrorInfo }> = []

  constructor(config: {
    useHook: HookFn<HookParams, HookRType>,
    hookParameters?: HookParams,
    actions?: Actions,
    values?: Values,
    strictMode?: boolean
    cleanupManager?: CleanupManager
  }) {
    this.onError = this.onError.bind(this)
    this.actionSync = this.actionSync.bind(this)
    this.action = this.action.bind(this)
    this.get = this.get.bind(this)
    this.dispose = this.dispose.bind(this)
    this.useHook = config.useHook
    this.hookParameters = (config.hookParameters ? [...config.hookParameters] : []) as HookParams
    this.actions = { ...config.actions } as Actions
    this.values = { ...config.values } as Values
    if (config.cleanupManager) { config.cleanupManager.append(this.dispose) }
    act(() => {
      this.renderResult = render(
        createElement(
          config.strictMode ? StrictMode : Fragment,
          {},
          createElement(ErrorBoundary, {
            onError: this.onError,
          }, createElement(this.ContainerComponent))
        )
      )
    })
  }

  private ContainerComponent = (): JSX.Element => {

    const { useHook } = this
    const hookData = useHook(...this.hookParameters)
    useEffect(() => { this._renderCount += 1 })

    this.dispatchableActions = {}
    for (const actionKey in this.actions) {
      const actionCallback = this.actions[actionKey]
      this.dispatchableActions[actionKey] = () => {
        return actionCallback(hookData)
      }
    }

    this.retrievableValues = {}
    for (const valueKey in this.values) {
      const valueMapper = this.values[valueKey]
      const mappedValue = valueMapper(hookData) as ReturnType<Values[keyof Values]>
      this.retrievableValues[valueKey] = mappedValue
    }

    return null!

  }

  private onError(error: Error, errorInfo: ErrorInfo): void {
    this.capturedErrors.push({ error, errorInfo })
  }

  get renderCount(): number {
    return this._renderCount
  }

  actionSync(...actionKeys: Array<keyof Actions>): number {
    const previousRenderCount = this._renderCount
    act((): void => {
      for (const actionKey of actionKeys) {
        if (hasProperty(this.dispatchableActions, actionKey)) {
          this.dispatchableActions[actionKey]()
        } else {
          throw new ReferenceError(`Action '${actionKey as string}' does not exist`)
        }
      }
    })
    return this._renderCount - previousRenderCount
  }

  async action(...actionKeys: Array<keyof Actions>): Promise<number> {
    const previousRenderCount = this._renderCount
    await act(async (): Promise<void> => {
      for (const actionKey of actionKeys) {
        if (hasProperty(this.dispatchableActions, actionKey)) {
          await this.dispatchableActions[actionKey]()
        } else {
          throw new ReferenceError(`Action '${actionKey as string}' does not exist`)
        }
      }
    })
    return this._renderCount - previousRenderCount
  }

  get(valueKey: keyof Values): ReturnType<Values[keyof Values]> {
    if (hasProperty(this.retrievableValues, valueKey)) {
      return this.retrievableValues[valueKey]
    } else {
      throw new ReferenceError(`Value '${valueKey as string}' does not exist`)
    }
  }

  dispose(): void {
    this.renderResult?.unmount()
  }

}

interface ErrorBoundaryProps {
  children?: ReactNode
  onError(error: Error, errorInfo: ErrorInfo): void
}

interface ErrorBoundaryState {
  error: boolean
}

class ErrorBoundary extends ReactComponent<ErrorBoundaryProps, ErrorBoundaryState> {

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { error: true }
  }

  state: Readonly<ErrorBoundaryState> = { error: false }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render(): ReactNode {
    return this.state.error ? null : this.props.children
  }

}

function hasProperty(
  object: unknown,
  propertyName: PropertyKey
): boolean {
  if (!object) { return false } // Early exit
  return Object.prototype.hasOwnProperty.call(object, propertyName)
}
