import { NotImplementeError } from '../lib/errors'

export function throwNotImplementedMethod() {
  throw new NotImplementeError()
}
