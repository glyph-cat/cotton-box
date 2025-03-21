let counter = 0

export function getAutomaticName(): string {
  return `UnnamedStateManager_${String(++counter).padStart(3, '0')}`
}
