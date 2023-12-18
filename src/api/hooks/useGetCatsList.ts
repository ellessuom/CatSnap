import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserImageResponse } from '@thatapicompany/thecatapi/dist/types'
import { queryKeys } from 'src/api/queryKeys'
import { useClient } from 'src/api/the-cat-api/useClient'
import config from 'src/config'

export const useGetCatsList = () => {
  const client = useClient()

  const getList = useCallback(async () => {
    const data = await client.get<UserImageResponse[]>(
      `/images?limit=${config.consts.GET_CAT_LIST_LIMIT}`
    )
    return data
  }, [])

  return useQuery({
    queryKey: queryKeys.getCatsList,
    queryFn: getList,
  })
}
