import { spawn } from 'node:child_process'

export function customSpawn(command: string, args: readonly string[]): Promise<void> {
  const child = spawn(
    command,
    args,
    {
      env: {
        ...process.env,
        FORCE_COLOR: '1',
      },
      shell: false,
      stdio: 'inherit',
    }
  )
  return new Promise((resolve) => {
    child.on('close', (code) => {
      resolve()
      if (code) { process.exit(code) }
    })
  })
}
