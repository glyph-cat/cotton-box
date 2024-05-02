import { Equality } from 'cotton-box'

if (typeof window !== 'undefined') {
  // #region example
  console.log(Equality.shallowCompareArrayOrObject([], [])) // true
  console.log(Equality.shallowCompareArrayOrObject({}, {})) // true
  console.log(Equality.shallowCompareArrayOrObject([], {})) // false

  console.log(Equality.shallowCompareArray([1, 2], [1, 2])) // true

  console.log(Equality.shallowCompareObject(
    { a: 'foo', b: 42 },
    { a: 'foo', b: 42 }
  )) // true
  // #endregion example
}

export { default } from '@/components/none'
