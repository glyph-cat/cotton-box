import { spawn } from 'node:child_process'

export interface SpawnResult {
  code: number | null
  output: string
}

export function spawnAsync(command: string, args?: readonly string[]): Promise<SpawnResult> {
  const child = spawn(
    command,
    args,
    {
      env: {
        ...process.env,
        FORCE_COLOR: '1',
      },
      shell: false,
    }
  )
  let output = ''
  child.stdout.on('data', (chunk) => { output += chunk })
  child.stderr.on('data', (chunk) => { output += chunk })
  return new Promise((resolve, reject) => {
    child.on('close', (code) => {
      resolve({ code, output })
      // if (code) {
      //   reject({ code, output })
      // } else {
      //   resolve({ code, output })
      // }
    })
  })
}

export async function withPrintedOutput(
  ...promises: Array<ReturnType<typeof spawnAsync>>
): Promise<void> | never {
  let hasError = false
  for (const promise of promises) {
    const { code, output } = await promise
    if (code) { hasError = true }
    process.stdout.write(output)
  }
  if (hasError) {
    process.exit(1)
  }
}

/**
 * @deprecated
 */
export class UNSAFE_SpawnChain {

  static spawnAsync(command: string, args?: readonly string[]): Promise<SpawnResult> {
    const child = spawn(
      command,
      args,
      {
        env: {
          ...process.env,
          FORCE_COLOR: '1',
        },
        shell: false,
      }
    )
    let output = ''
    child.stdout.on('data', (chunk) => { output += chunk })
    child.stderr.on('data', (chunk) => { output += chunk })
    return new Promise((resolve, reject) => {
      child.on('close', (code) => {
        resolve({ code, output })
      })
    })
  }

  private totalSpawnCount = 0

  private successfulSpawnCount = 0

  async run(...args: Parameters<typeof UNSAFE_SpawnChain.spawnAsync>): Promise<SpawnResult> {
    let result: SpawnResult
    this.totalSpawnCount += 1
    result = await UNSAFE_SpawnChain.spawnAsync(...args)
    const { code, output } = result
    if (!code) { this.successfulSpawnCount += 1 }
    process.stdout.write(output)
    return result
  }

  async runParallel(
    ...spawnInvocations: Array<Parameters<typeof UNSAFE_SpawnChain.spawnAsync>>
  ): Promise<Array<SpawnResult>> {
    const promises = spawnInvocations.map((spawnInvocation) => {
      this.totalSpawnCount += 1
      return UNSAFE_SpawnChain.spawnAsync(...spawnInvocation)
    })
    const results: Array<SpawnResult> = []
    for (const promise of promises) {
      const result = await promise
      results.push(result)
      const { code, output } = result
      process.stdout.write(output)
      if (!code) { this.successfulSpawnCount += 1 }
    }
    return results
  }

}
