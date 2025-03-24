import { shallowCompareArray } from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(shallowCompareArray([], [])) // true

  console.log(shallowCompareArray([1, 2], [1, 2])) // true
  console.log(shallowCompareArray([1, 2], [1, 3])) // false

  console.log(shallowCompareArray(['a', 'b'], ['a', 'b'])) // true
  console.log(shallowCompareArray(['a', 'b'], ['a', 'c'])) // false
  console.log(shallowCompareArray(['a', 'b'], ['a'])) // false
  // #endregion example
}

export { default } from '~components/none'
