import * as fs from 'node:fs'
import { ENCODING_UTF_8 } from '../constants'

// What this script does:
// Updates the year in the `LICENSE` file.

const licenseFilePath = './LICENSE'
let licenseText = fs.readFileSync(licenseFilePath, ENCODING_UTF_8)

const yearPublished = 2024
const currentYear = new Date().getFullYear()

licenseText = licenseText.replace(
  (licenseText.match(/\d{4}/gm) || []).length === 1 ? /\d{4}/ : /\d{4} - \d{4}/,
  currentYear === yearPublished
    ? `${yearPublished}`
    : `${yearPublished} - ${currentYear}`
)

fs.writeFileSync(licenseFilePath, licenseText, ENCODING_UTF_8)
