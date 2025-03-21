import { Equality } from 'cotton-box'

if (typeof window !== 'undefined') {
  // #region example
  console.log(Equality.shallowCompareArray([], [])) // true

  console.log(Equality.shallowCompareArray([1, 2], [1, 2])) // true
  console.log(Equality.shallowCompareArray([1, 2], [1, 3])) // false

  console.log(Equality.shallowCompareArray(['a', 'b'], ['a', 'b'])) // true
  console.log(Equality.shallowCompareArray(['a', 'b'], ['a', 'c'])) // false
  console.log(Equality.shallowCompareArray(['a', 'b'], ['a'])) // false
  // #endregion example
}

export { default } from '~components/none'
