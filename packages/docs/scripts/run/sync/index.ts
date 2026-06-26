import { cp } from 'node:fs/promises'
import path from 'node:path'

(async function () {

  const packageDirectory = process.cwd()

  await cp(
    path.join(packageDirectory, '..', 'playground-web', 'src', 'pages', 'examples'),
    path.join(packageDirectory, 'src', 'examples'),
    {
      recursive: true,
      force: true,
    }
  )

})()
