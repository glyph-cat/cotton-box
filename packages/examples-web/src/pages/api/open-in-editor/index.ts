import { NextApiRequest, NextApiResponse } from 'next'
import { execSync } from 'child_process'

export default async function APICancelSwapTicketHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { p: path, e: fileExtension } = req.query
  // If 'code' is not found,
  // 1. Press ctrl/command-shift-P
  // 2. Search and run "Shell Command: Install 'code' command in PATH"
  const constructedPath = `${process.cwd()}/src/pages${path}.${fileExtension}`
  execSync(`code "${JSON.stringify(constructedPath)}"`)
  // KIV: js/shell-command-injection-from-environment
  // This is meant to be run temporarily in localhost only so it should be fine,
  // but let's keep an eye on this issue just in case.
  res.status(200).send(null)
}
