import { FavouriteResponse } from '@thatapicompany/thecatapi/dist/types'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'src/api/queryKeys'
import { useClient } from 'src/api/the-cat-api/useClient'
import { useCallback } from 'react'

export const useGetFavourites = () => {
  const client = useClient()

  const getList = useCallback(async () => {
    const data = await client.get<FavouriteResponse[]>(`/favourites`)

    return data
  }, [client])

  return useQuery({
    queryKey: queryKeys.getFavourites,
    queryFn: getList,
  })
}
