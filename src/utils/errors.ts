import { NotImplementeError } from 'src/lib/errors'

export function throwNotImplementedMethod() {
  throw new NotImplementeError()
}
