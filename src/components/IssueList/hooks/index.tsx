import { useEffect, useState, useRef } from 'react'
import { useDataProvider } from 'react-admin'
import { Component, FacetProperties, FacetValue } from '../../../types/sonarQube/issue'
import { keyBy } from '../../../utils'
import { useIncrementState, useLazyGetAllProjects } from '../../../hooks'

export type ParsedComponent = Omit<Component, 'key'> & { id: string }

export interface UseCustomInfniteProps {
  perPage?: number
  page?: number
  resource: FacetProperties
}

// TODO: desaoplar responsabilidades par abajar complejidad cognitiva
// TODO: agregar memo
export function useCustomInfnite({ perPage = 10, page = 1, resource: facetResource }: UseCustomInfniteProps) {
  const dataProvider = useDataProvider()
  const getAllProjects = useLazyGetAllProjects()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ currentPage, setCurrentPage ] = useIncrementState(page)
  const [ authors, setAuthors ] = useState<FacetValue[]>([])

  const cacheAuthors = useRef<Record<string, FacetValue>>({})
  const projects = useRef<ParsedComponent[]>([])
  const projectStepper = useRef(0)

  async function fetchNext() {
    const limit = currentPage * perPage

    setIsLoading(true)

    if (!projects.current.length) {
      const projectsData = await getAllProjects()
      projects.current.push(...projectsData)
    }

    while (Object.values(cacheAuthors.current).length <= limit) {
      const { data } = await dataProvider.getList(facetResource, {
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

      cacheAuthors.current = { ...prevCache, ...keyBy(data, 'val') }
      projectStepper.current++
    }

    setAuthors([ ...Object.values(cacheAuthors.current) ])
    setCurrentPage()
    setIsLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchNext().catch(console.error)
  }, [])

  return { data: authors, isLoading, fetchNext }
}
