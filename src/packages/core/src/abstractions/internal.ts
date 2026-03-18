export type CommitStrategy = 'commit' | 'commitNoop'

export enum StateChangeEventType {
  /* Set   */ S = 1,
  /* Reset */ R,
  /* Init  */ I,
}
