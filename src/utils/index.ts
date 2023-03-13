import { PojoType } from 'src/types'

export function cleanPojo(pojo: Record<string, unknown>) {
  return Object.keys(pojo).reduce((newPojo: Record<string, unknown>, key) => {
    const value = pojo[key]
    // eqqeq se omite aproposito para tambien comparar undefined
    const isNotNill = value != null

    if (isNotNill) newPojo[key] = value

    return newPojo
  }, {})
}

export function wrapData(pojo: Record<string, unknown>) {
  return { data: pojo }
}

export function stringifySearchParams<T = PojoType>(pojo?: T) {
  return pojo
    ? Object.keys(pojo).reduce(
      (stringified, key, index) => stringified + `${index !== 0 ? '&' : ''}${key}=${pojo[key as keyof typeof pojo]}`,
      ''
    )
    : ''
}

export function keyBy<T = any>(arr: Record<string, T>[], key: string) {
  return arr.reduce((prevPojo: Record<string, any>, next) => {
    const value = next[key]
    prevPojo[String(value)] = next

    return prevPojo
  }, {})
}
