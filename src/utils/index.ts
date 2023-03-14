import { PojoType } from '../types'
import langMap from 'lang-map'

export const cleanPojo = (pojo: Record<string, unknown>) =>
  Object.keys(pojo).reduce((newPojo: Record<string, unknown>, key) => {
    const value = pojo[key]
    // eqqeq se omite aproposito para tambien comparar undefined
    const isNotNill = value != null

    if (isNotNill) newPojo[key] = value

    return newPojo
  }, {})

export const stringifySearchParams = <T = PojoType>(pojo?: T) =>
  pojo
    ? Object.keys(pojo).reduce(
      (stringified, key, index) => stringified + `${index !== 0 ? '&' : ''}${key}=${pojo[key as keyof typeof pojo]}`,
      ''
    )
    : ''

export const keyBy = <T = any>(arr: Record<string, T>[], key: string) =>
  arr.reduce((prevPojo: Record<string, any>, next) => {
    const value = next[key]
    prevPojo[String(value)] = next

    return prevPojo
  }, {})

export function getFileExtension(filePath: string) {
  return filePath?.split('.')?.pop() || filePath
}

export function getFirstLanguageFromFile(filePath: string) {
  try {
    const [ firstLanguage ] = langMap.languages(getFileExtension(filePath)) ?? []

    return firstLanguage
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return 'File type not identified'
  }
}

declare global {
  interface Window {
    [key: string | number]: unknown
  }
}

export function exposeToGlobal(reference: object, name?: string) {
  const propertyName = name ?? reference?.constructor?.name
  window[propertyName] = reference
}

export { getHourMinSec, getShortDate, getTimeAndDate } from './date'

export async function batchProccess<T = unknown, K = unknown>(
  data: T[],
  cb: (item: T, index: number, batchIteration: number, array: T[]) => Promise<K>,
  limit = 1000
) {
  const temp = [ ...data ]
  const results: K[] = []
  let batchIteration = 0

  while (temp.length !== 0) {
    const batch = data.splice(0, limit)
    const partitalResults = await Promise.all(batch.map((e, i, a) => cb(e, i, batchIteration, a)))

    results.push(...partitalResults)
    batchIteration++
  }

  return results
}
