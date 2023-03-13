import { keyBy } from '..'

export interface MergeAppendArgs {
  arrayIdName?: string
}

export type Pojo = Record<string, unknown>

export class ListCache {
  private cachePojo: Pojo
  constructor(initialCache: Pojo) {
    this.cachePojo = initialCache
  }

  mergeAppend(data: Pojo | Pojo[], options?: MergeAppendArgs) {
    if (!Array.isArray(data)) return Object.assign(this.cachePojo, data)

    const { arrayIdName = 'id' } = options ?? {}

    return Object.assign(this.cachePojo, keyBy(data, arrayIdName))
  }

  async *getGenerator(iterationSize: number, cb: (cachePojo: Pojo) => Promise<Pojo>) {
    let iterationCount = 0

    const data = await cb(this.cachePojo)
    this.mergeAppend(data)

    yield ++iterationCount
  }
}
