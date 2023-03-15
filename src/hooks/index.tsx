import { useDataProvider } from 'react-admin'
import { useState } from 'react'

export const useLazyGetAllProjects = () => {
  const dataProvider = useDataProvider()

  return async function () {
    const { total } = await dataProvider.getList('projects', {
      filter: undefined,
      sort: { field: '', order: '' },
      pagination: {
        page: 1,
        perPage: 10,
      },
    })

    const { data } = await dataProvider.getList('projects', {
      filter: undefined,
      sort: { field: '', order: '' },
      pagination: {
        page: 1,
        perPage: total ?? 0,
      },
    })

    return data
  }
}

export const useIncrementState = (initialState = 0, step = 1): [number, () => void] => {
  const [ state, setState ] = useState(initialState)

  function increment() {
    setState((prev) => prev + step)
  }

  return [ state, increment ]
}

/* // TODO: try to use observables, what is this s** Piero
const useRefetch = () =>{
  const [] =
} */
