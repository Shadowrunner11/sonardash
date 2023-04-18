import papa from 'papaparse'
import { AuthorInput } from 'src/__generated__/graphql'

export const homologusData: Record<keyof AuthorInput, string> = Object.freeze({
  firstname: 'nombre',
  lastname: 'apellidos',
  tribe: 'tribu',
  squad: 'squad',
  role: 'rol',
  chapter: 'chapter',
  provider: 'proveder',
  email: 'email',
  status: 'estado',
})

export const columnIds = Object.freeze(Object.keys(homologusData))

export const columLabels = Object.freeze(Object.values(homologusData))

export const mockData = Object.freeze([
  'Pepito',
  'Wick',
  'Post Punk',
  'Molchat Doma',
  'Front end developer',
  'Front end',
  'MDP',
  'pepito4@gmail.com',
  'delete',
])

export const csvExample = papa.unparse({
  fields: [ ...columLabels ],
  data: [ ...mockData ],
})

const blobCsvExample = new Blob([ csvExample ], {
  type: 'text/csv',
})

export const blobURL_CSV = URL.createObjectURL(blobCsvExample)
