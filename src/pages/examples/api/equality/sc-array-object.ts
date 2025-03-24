import {
  shallowCompareArray,
  shallowCompareArrayOrObject,
  shallowCompareObject,
} from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(shallowCompareArrayOrObject([], [])) // true
  console.log(shallowCompareArrayOrObject({}, {})) // true
  console.log(shallowCompareArrayOrObject([], {})) // false

  console.log(shallowCompareArray([1, 2], [1, 2])) // true

  console.log(shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42 }
  )) // true
  // #endregion example
}

export { default } from '~components/none'
