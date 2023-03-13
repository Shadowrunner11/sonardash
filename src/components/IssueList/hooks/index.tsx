import { useEffect, useState, useRef } from 'react'
import { useDataProvider } from 'react-admin'
import { Component, FacetProperties, FacetValue } from '../../../types/sonarQube/issue'
import { keyBy } from '../../../utils'

export type ParsedComponent = Omit<Component, 'key'> & { id: string }

// TODO: desaoplar responsabilidades par abajar complejidad cognitiva
// TODO: agregar memo
export function useInfiniteAuthors({ perPage, page } = { perPage: 10, page: 1 }) {
  const dataProvider = useDataProvider()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentPage, setCurrentPage ] = useState(page)
  const [ authors, setAuthors ] = useState<FacetValue[]>([])

  const cacheAuthors = useRef<Record<string, FacetValue>>({})
  const projects = useRef<ParsedComponent[]>([])
  const projectStepper = useRef(0)

  async function softSideEffet() {
    const { total } = await dataProvider.getList(FacetProperties.PROJECTS, {
      filter: undefined,
      sort: { field: '', order: '' },
      pagination: {
        page: 1,
        perPage: 10,
      },
    })

    const { data: allProjects } = await dataProvider.getList(FacetProperties.PROJECTS, {
      filter: undefined,
      sort: { field: '', order: '' },
      pagination: {
        page: 1,
        perPage: total ?? 0,
      },
    })

    projects.current.push(...allProjects)
  }

  async function fetchNext() {
    const limit = currentPage * perPage

    setIsLoading(true)

    if (!projects.current.length) await softSideEffet()

    while (Object.values(cacheAuthors.current).length <= limit) {
      const { data } = await dataProvider.getList(FacetProperties.AUTHORS, {
        filter: {
          project: projects.current[projectStepper.current].id,
        },
        pagination: {
          page: currentPage,
          perPage,
        },
        sort: { field: '', order: '' },
      })

      const prevCache = cacheAuthors.current

      cacheAuthors.current = { ...keyBy(data, 'val'), ...prevCache }
      projectStepper.current++
    }

    setAuthors([ ...Object.values(cacheAuthors.current) ])
    setCurrentPage((prev) => prev + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchNext().catch(console.error)
  }, [])

  return { data: authors, isLoading, fetchNext }
}
