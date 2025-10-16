import { execSync } from 'child_process'
import { existsSync, statSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { SandboxUrlParam } from '~constants'

// NOTE
// If 'code' is not found,
// 1. Press ctrl/command-shift-P
// 2. Search and run "Shell Command: Install 'code' command in PATH"

export default async function APIOpenInEditor(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const {
    [SandboxUrlParam.PATHNAME]: destinationReferencePath,
  } = req.query

  const referencePath = path.join(
    process.cwd(),
    'src',
    'pages',
    path.normalize(String(destinationReferencePath)),
  )

  const destinationPath = resolvePath(referencePath)

  if (typeof destinationPath === 'string') {
    execSync(`code "${destinationPath}"`)
    // KIV: js/shell-command-injection-from-environment
    // This is meant to be run temporarily in localhost only so it should be fine,
    // but let's keep an eye on this issue just in case.
    res.status(200).send(null)
  } else {
    res.status(404).send(null)
  }

}

function resolvePath(referencePath: string): string | null {
  let referencePathIsDirectory = false
  try {
    referencePathIsDirectory = statSync(referencePath).isDirectory()
  } catch (_error) { // eslint-disable-line @typescript-eslint/no-unused-vars
    // No action required
  }
  if (referencePathIsDirectory) {
    const fileTs = path.join(referencePath, 'index.ts')
    if (existsSync(fileTs)) {
      return fileTs
    }
    const fileTsx = path.join(referencePath, 'index.tsx')
    if (existsSync(fileTsx)) {
      return fileTsx
    }
  } else {
    const fileTs = `${referencePath}.ts`
    if (existsSync(fileTs)) {
      return fileTs
    }
    const fileTsx = `${referencePath}.tsx`
    if (existsSync(fileTsx)) {
      return fileTsx
    }
  }
  return null
}
