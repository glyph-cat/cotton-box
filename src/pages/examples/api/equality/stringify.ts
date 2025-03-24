import { stringifyCompare } from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(stringifyCompare('a', 'a')) // true
  console.log(stringifyCompare('42', 42)) // false

  console.log(stringifyCompare(
    new Date('2020/11/26'),
    new Date('2020/11/26')
  )) // true

  console.log(stringifyCompare(
    new Date('2020/11/26'),
    new Date('2020/11/27')
  )) // false
  // #endregion example
}

export { default } from '~components/none'
