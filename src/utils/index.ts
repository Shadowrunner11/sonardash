import { PojoType } from '../types'
import langMap from 'lang-map'

// prettier-ignore
export const cleanPojo = (pojo: Record<string, unknown>) =>
  Object
    .keys(pojo)
    .reduce((newPojo: Record<string, unknown>, key) => {
      const value = pojo[key]
      // eqqeq se omite aproposito para tambien comparar undefined
      const isNotNill = value != null

      if (isNotNill) newPojo[key] = value

      return newPojo
    }, {})

// prettier-ignore
export const stringifySearchParams = <T = PojoType>(pojo?: T) =>
  pojo ? Object
    .keys(pojo)
    .reduce((stringified, key, index) =>
      stringified + `${index !== 0 ? '&' : ''}${key}=${pojo[key as keyof typeof pojo]}`,
    '')
    : ''

export const keyBy = <T = any>(arr: Record<string, T>[], key: string) =>
  arr.reduce((prevPojo: Record<string, any>, next) => {
    const value = next[key]
    prevPojo[String(value)] = next

    return prevPojo
  }, {})

export const getFileExtension = (filePath: string) => filePath?.split('.')?.pop() || filePath

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

/**
* Process a large array of data in batches and applies a callback function to each item in the batch.
* @param data - Array of data to be processed in batches.
* @param cb - Callback function to be applied to each item in the batch.
* @param limit - Batch size limit, default to 1000.
* @returns Array of results from applying the callback function to each item in the batch.
* @typeparam T - Type of the input data array.
* @typeparam K - Type of the output data array.
* @example
* const getPokemonList = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const { results: pokemonList } = response.data;

    const results = await batchProcessWithCallback<Pokemon, Pokemon>(
      pokemonList,
      doSomethingWithEachPokemon, // do somenthing with each pokemon one by one
      50 // Process 50 Pokemon at a time
    );

    return results;
};

 getPokemonList().then(console.log).catch(console.error);
*/
export const batchProccess = async <T = unknown, K = unknown>(
  data: T[],
  cb: (item: T, index: number, batchIteration: number, array: T[]) => Promise<K>,
  limit = 1000
) => {
  const temp = [ ...data ]
  const results: K[] = []
  let batchIteration = 0

  while (temp.length) {
    const batch = temp.splice(0, limit)
    const partitalResults = await Promise.all(batch.map((e, i, a) => cb(e, i, batchIteration, a)))

    results.push(...partitalResults)
    batchIteration++
  }

  return results
}
