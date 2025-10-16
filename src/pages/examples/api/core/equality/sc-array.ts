import { arrayIsShallowEqual } from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(arrayIsShallowEqual([], [])) // true

  console.log(arrayIsShallowEqual([1, 2], [1, 2])) // true
  console.log(arrayIsShallowEqual([1, 2], [1, 3])) // false

  console.log(arrayIsShallowEqual(['a', 'b'], ['a', 'b'])) // true
  console.log(arrayIsShallowEqual(['a', 'b'], ['a', 'c'])) // false
  console.log(arrayIsShallowEqual(['a', 'b'], ['a'])) // false
  // #endregion example
}

export default () => null
