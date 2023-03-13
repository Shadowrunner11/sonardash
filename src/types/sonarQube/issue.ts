export interface IIssuesResponse {
  total: number
  p: number
  ps: number
  paging: Paging
  effortTotal: number
  issues: Issue[]
  components: Component[]
  facets: Facet[]
}

export interface IProjectsResponse {
  paging: Paging
  components: Component[]
}
export interface Facet {
  property: FacetProperties
  values: FacetValue[]
}

export interface FacetValue {
  val: string
  count: number
}

export enum FacetProperties {
  'AUTHORS' = 'authors',
  'PROJECTS' = 'projects',
  'RULES' = 'rules',
}

export interface Component {
  key: string
  enabled?: boolean
  qualifier: Qualifier
  name: string
  longName?: string
  path?: string
  isFavorite?: boolean
  tags: [string?]
  needIssueSync?: boolean
}

export enum Qualifier {
  Fil = 'FIL',
  Trk = 'TRK',
  Uts = 'UTS',
}

export interface Issue {
  key: string
  rule: string
  severity: Severity
  component: string
  project: string
  line?: number
  hash?: string
  textRange?: TextRange
  flows: Flow[]
  status: Status
  message: string
  effort: Debt
  debt: Debt
  author: string
  tags: string[]
  creationDate: string
  updateDate: string
  type: Type
  scope: Scope
  assignee?: string
}

export enum Debt {
  The10Min = '10min',
  The15Min = '15min',
  The20Min = '20min',
  The2Min = '2min',
  The4Min = '4min',
  The5Min = '5min',
  The6H10Min = '6h10min',
  The6Min = '6min',
  The8Min = '8min',
}

export interface Flow {
  locations: Location[]
}

export interface Location {
  component: string
  textRange: TextRange
  msg?: string
}

export interface TextRange {
  startLine: number
  endLine: number
  startOffset: number
  endOffset: number
}

export enum Scope {
  Main = 'MAIN',
  Test = 'TEST',
}

export enum Severity {
  Blocker = 'BLOCKER',
  Critical = 'CRITICAL',
  Major = 'MAJOR',
  Minor = 'MINOR',
}

export enum Status {
  Open = 'OPEN',
}

export enum Type {
  Bug = 'BUG',
  CodeSmell = 'CODE_SMELL',
}

export interface Paging {
  pageIndex: number
  pageSize: number
  total: number
}
