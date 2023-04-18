import type { ParseResult } from 'papaparse'
import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import { useUpdateMany } from 'react-admin'
import { AuthorInput } from 'src/__generated__/graphql'

// TODO: Type updateData
interface UpsertData {
  parsedCSV: ParseResult<Record<string, string>> | undefined
  currentSelectFields: Record<string, keyof AuthorInput>
  updateData: any
}

type setParsedCSV = React.Dispatch<React.SetStateAction<ParseResult<Record<string, string>> | undefined>>

type UseUpserResult = [(event: SyntheticEvent) => Promise<void>, setParsedCSV, UpsertData]

// TODO; add filter of correctd sanitized data and failed data
export const useUpsertAuthorsFromCsv = (): UseUpserResult => {
  const [ parsedCSV, setParsedCSV ] = useState<ParseResult<Record<string, string>> | undefined>()

  const { current: currentSelectFields } = useRef<Record<string, keyof AuthorInput>>({})

  const [ update, updateData ] = useUpdateMany()

  const _handleClickSend = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault()

      const parsedData: AuthorInput[] | undefined = parsedCSV?.data
        .map((csvPojo) =>
          Object.keys(csvPojo).reduce((acum, key) => {
            const newKey = currentSelectFields[key]

            acum[newKey] = csvPojo[key]

            return acum
          }, {} as AuthorInput)
        )
        .filter(({ firstname }) => firstname)

      await update('authors', {
        data: parsedData,
        ids: [],
      })

      setParsedCSV(undefined)
    },
    [ parsedCSV ]
  )

  return [ _handleClickSend, setParsedCSV, { parsedCSV, currentSelectFields, updateData } ]
}
