import { useEffect, useState, useRef } from 'react'
import { useDataProvider } from 'react-admin'
import { Component, FacetProperties, FacetValue } from '../../../types/sonarQube/issue'
import { keyBy } from '../../../utils'
import { useLazyGetAllProjects } from '../../../hooks'

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
  const [ currentPage, setCurrentPage ] = useState(page)
  const [ authors, setAuthors ] = useState<FacetValue[]>([])
  const [ hasNextPage, setHasNextPage ] = useState(true)

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

    const hasNotReachedTotal = projectStepper.current <= projects.current.length

    if (!hasNotReachedTotal) setHasNextPage(false)

    while (Object.values(cacheAuthors.current).length <= limit && hasNotReachedTotal) {
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

      Object.assign(cacheAuthors.current, keyBy(data, 'val'))

      projectStepper.current++
    }

    setAuthors([ ...Object.values(cacheAuthors.current).slice(0, limit) ])
    setCurrentPage((prev) => prev + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    if (currentPage === page)
      // eslint-disable-next-line no-console
      fetchNext().catch(console.error)

    return () => {
      setCurrentPage(page)
    }
  }, [])

  return { data: authors, isLoading, fetchNext, hasNextPage }
}
