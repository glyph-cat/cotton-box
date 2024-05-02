export function getErrorMessageForOverlappingInits(name: string): string {
  return `Cannot initialize ${name ? `"${name}"` : 'state'}` + ' because the previous initialization is not yet complete.'
}

export function getErrorMessageForRepeatedInitCommits(
  name: string,
  commitStrategy: 'commit' | 'commitNoop'
): string {
  return `Attempted to call \`${commitStrategy}\`${name ? ` for "${name}"` : ''}` + ' multiple times for the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.'
}

export function getErrorMessageForSetOrResetDuringInitialization(name: string): string {
  return `Cannot set/reset while ${name ? `"${name}"` : 'state'} is still initializing.`
}
