import {
  arrayIsShallowEqual,
  arrayOrObjectIsShallowEqual,
  objectIsShallowEqual,
} from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(arrayOrObjectIsShallowEqual([], [])) // true
  console.log(arrayOrObjectIsShallowEqual({}, {})) // true
  console.log(arrayOrObjectIsShallowEqual([], {})) // false

  console.log(arrayIsShallowEqual([1, 2], [1, 2])) // true

  console.log(objectIsShallowEqual(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42 }
  )) // true
  // #endregion example
}

export default () => null
