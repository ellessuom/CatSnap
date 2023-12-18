import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useClient } from 'src/api/the-cat-api/useClient'
import { queryKeys } from 'src/api/queryKeys'
import queryClient from 'src/api/queryClient'

const useLikeCat = () => {
  const client = useClient()

  const likePic = useCallback(
    async (imgId: string) => {
      return client.post(
        '/favourites',
        JSON.stringify({
          image_id: imgId,
        })
      )
    },
    [client]
  )

  return useMutation({
    mutationFn: async (imgId: string) => {
      return likePic(imgId)
    },
    mutationKey: queryKeys.favouriteCat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getFavourites })
    },
  })
}

export { useLikeCat as useFavouriteCat }
