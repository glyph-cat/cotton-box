import { Equality } from 'cotton-box'

if (typeof window !== 'undefined') {
  // #region example
  console.log(Equality.stringifyCompare('a', 'a')) // true
  console.log(Equality.stringifyCompare('42', 42)) // false

  console.log(Equality.stringifyCompare(
    new Date('2020/11/26'),
    new Date('2020/11/26')
  )) // true

  console.log(Equality.stringifyCompare(
    new Date('2020/11/26'),
    new Date('2020/11/27')
  )) // false
  // #endregion example
}

export { default } from '~components/none'
