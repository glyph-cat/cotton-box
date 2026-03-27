import {
  TYPE_REFERENCE_URL_PROMISE,
  TYPE_REFERENCE_URL_UNDEFINED,
} from './99-external-references'

export const TYPE_UNDEFINED = `[\`undefined\`](${TYPE_REFERENCE_URL_UNDEFINED})`
export const TYPE_PROMISE_UNDEFINED = `A [\`Promise\`](${TYPE_REFERENCE_URL_PROMISE}) that resolves into ${TYPE_UNDEFINED}.`
