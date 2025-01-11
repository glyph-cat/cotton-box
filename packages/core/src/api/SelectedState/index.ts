import {
  ReadOnlyStateManager,
  StateChangeEventType,
  StateSelector,
  WaitEvaluator,
} from '../../abstractions'
import { SimpleStateManager } from '../SimpleStateManager'
import { StateManager } from '../StateManager'

export class SelectedState<State, SelectedState> implements ReadOnlyStateManager<SelectedState> {

  /**
   * @internal
   */
  private readonly M$state: SimpleStateManager<SelectedState>

  constructor(
    state: StateManager<State>,
    selector: StateSelector<State, SelectedState>
  ) {
    this.M$state = new SimpleStateManager(selector(state.get()))
    state.watch((newState) => { this.M$state.set(selector(newState)) })
    // TODO: What about complex State Managers with `isInitializing` state?
  }

  get(): SelectedState {
    return this.M$state.get()
  }

  wait(expectedValue: SelectedState): Promise<SelectedState>
  wait(evaluator: WaitEvaluator<SelectedState>): Promise<SelectedState>
  wait(valueOrEvaluator: SelectedState | WaitEvaluator<SelectedState>): Promise<SelectedState>
  wait(valueOrEvaluator: SelectedState | WaitEvaluator<SelectedState>): Promise<SelectedState> {
    return this.M$state.wait(valueOrEvaluator)
  }

  watch(callback: (state: SelectedState, eventType: StateChangeEventType) => void): () => void {
    return this.M$state.watch(callback)
  }

  dispose(): void {
    this.M$state.dispose()
  }

}
