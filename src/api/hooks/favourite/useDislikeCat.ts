import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'src/api/queryKeys'
import { useClient } from 'src/api/the-cat-api/useClient'
import queryClient from 'src/api/queryClient'

export const useDislikeCat = () => {
  const client = useClient()

  const deleteLike = useCallback(async (likeId: number) => {
    const data = await client.delete(`/favourites/${likeId}`)
    return data
  }, [])

  return useMutation({
    mutationKey: queryKeys.deleteLike,
    mutationFn: (likeId: number) => deleteLike(likeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getFavourites })
    },
  })
}
