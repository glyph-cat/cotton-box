import { CommitStrategy } from '../../abstractions'

export function getErrorMessageForOverlappingInits(name: string | undefined | null): string {
  return `Cannot initialize ${name ? `"${name}"` : 'state'}` + ' because the previous initialization is not yet complete.'
}

export function getErrorMessageForRepeatedInitCommits(
  name: string | undefined | null,
  commitStrategy: CommitStrategy,
  alreadyEffectiveCommitStrategy: CommitStrategy,
): string {
  return [
    'Attempted to call',
    commitStrategy === alreadyEffectiveCommitStrategy
      ? `\`${commitStrategy}\`${name ? ` for "${name}"` : ''}` + ' multiple times'
      : `\`${commitStrategy}\`${name ? ` for "${name}"` : ''} even though \`${alreadyEffectiveCommitStrategy}\` has already been called`,
    'in the same `init` callback. Only the first commit will be effective while subsequent calls are ignored. If this was intentional, make separate `init` calls instead, otherwise it might indicate a memory leak in your application.',
  ].join(' ')
}

export function getErrorMessageForSetOrResetDuringInitialization(name: string | undefined | null): string {
  return `Cannot set/reset while ${name ? `"${name}"` : 'state'} is still initializing.`
}
