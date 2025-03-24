import { shallowCompareObject } from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(shallowCompareObject({}, {})) // true

  console.log(shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42 }
  )) // true

  console.log(shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 101 }
  )) // false

  console.log(shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42, c: [] }
  )) // false
  // #endregion example
}

export { default } from '~components/none'
