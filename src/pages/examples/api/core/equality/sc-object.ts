import { objectIsShallowEqual } from '@glyph-cat/equality'

if (typeof window !== 'undefined') {
  // #region example
  console.log(objectIsShallowEqual({}, {})) // true

  console.log(objectIsShallowEqual(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42 }
  )) // true

  console.log(objectIsShallowEqual(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 101 }
  )) // false

  console.log(objectIsShallowEqual(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42, c: [] }
  )) // false
  // #endregion example
}

export default () => null
