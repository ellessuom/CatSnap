import { useMutation } from '@tanstack/react-query'
import { useClient } from 'src/api/the-cat-api/useClient'
import { queryKeys } from 'src/api/queryKeys'
import queryClient from 'src/api/queryClient'

type UseVoteCat = {
  imgId: string
  value: number
}

const useVoteCat = () => {
  const client = useClient()

  const likePic = async (imgId: string, value: number) => {
    return client.post(
      '/votes',
      JSON.stringify({
        image_id: imgId,
        value,
      })
    )
  }

  return useMutation({
    mutationFn: async ({ imgId, value }: UseVoteCat) => {
      return likePic(imgId, value)
    },
    mutationKey: queryKeys.voteCat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getVotes })
    },
  })
}

export { useVoteCat }
