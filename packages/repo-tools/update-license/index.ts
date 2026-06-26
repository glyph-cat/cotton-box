import { Encoding } from '@glyph-cat/foundation'
import { readFile, writeFile } from 'node:fs/promises'

/**
 * Updates the year in the `LICENSE` file.
 */
(async function () {

  const licenseFilePath = './LICENSE'
  let licenseText = await readFile(licenseFilePath, Encoding.UTF_8)

  const yearPublished = 2024
  const currentYear = new Date().getFullYear()

  licenseText = licenseText.replace(
    (licenseText.match(/\d{4}/gm) || []).length === 1 ? /\d{4}/ : /\d{4} - \d{4}/,
    currentYear === yearPublished
      ? `${yearPublished}`
      : `${yearPublished} - ${currentYear}`
  )

  await writeFile(licenseFilePath, licenseText, Encoding.UTF_8)

})()
