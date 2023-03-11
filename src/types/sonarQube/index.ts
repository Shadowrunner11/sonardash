export interface SonarApiParams extends PaginationParams {
  facets?: string
  componentKeys?: string
  authors?: string
}

export interface PaginationParams {
  /**page index */
  p?: number
  /**page size */
  ps?: number
}

export interface GetPaginationArgs {
  page?: number
  pageSize: number
}
