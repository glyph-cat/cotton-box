import { isJSONequal } from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(isJSONequal('a', 'a')) // true
  console.log(isJSONequal('42', 42)) // false

  console.log(isJSONequal(
    new Date('2020/11/26'),
    new Date('2020/11/26')
  )) // true

  console.log(isJSONequal(
    new Date('2020/11/26'),
    new Date('2020/11/27')
  )) // false
  // #endregion example
}

export default () => null
