import { Equality } from 'cotton-box'

if (typeof window !== 'undefined') {
  // #region example
  console.log(Equality.shallowCompareObject({}, {})) // true

  console.log(Equality.shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42 }
  )) // true

  console.log(Equality.shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 101 }
  )) // false

  console.log(Equality.shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42, c: [] }
  )) // false
  // #endregion example
}

export { default } from '~components/none'
