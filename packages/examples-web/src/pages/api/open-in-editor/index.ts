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
  execSync(`code ${`${process.cwd()}/src/pages${path}.${fileExtension}`}`)
  res.status(200).send(null)
}
