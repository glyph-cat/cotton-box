import { $ } from '../../abstractions'

export function getErrorMessageIfIncorrectType(stateManager: $): string {
  const stateManagerName = stateManager?.name
  const stateManagerType = (stateManager as $)?.type
  if (stateManagerType === 1) {
    return `It seems like you have mistakenly passed a \`SimpleStateManager\` ${stateManagerName ? `(name: ${stateManagerName}) ` : ''}to \`useInitStatus\`. \`SimpleStateManager\`s do not have lifecycle hooks.`
  }
}
