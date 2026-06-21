// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = (): void => { }

export const emptyWatcher = (): (() => void) => emptyFn
