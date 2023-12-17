import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { useClient } from "api/the-cat-api/useClient"
import { queryKeys } from "api/queryKeys"
import queryClient from "api/queryClient"

type UseVoteCat = {
    imgId: string
    value: number
}

const useVoteCat = () => {
    const client = useClient()

    const likePic = useCallback(async (imgId: string, value: number) => {
        return client.post('/votes', {
            image_id: imgId,
            value
        })
    }, [client])

    return useMutation({
        mutationFn: async ({imgId, value}: UseVoteCat) => {
            return likePic(imgId, value)
        },
        mutationKey: queryKeys.voteCat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.getVotes })
        }
    })
}

export { useVoteCat }
