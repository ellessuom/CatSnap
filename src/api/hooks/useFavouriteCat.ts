import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { useClient } from "api/the-cat-api/useClient"
import { queryKeys } from "api/queryKeys"

const useFavouriteCat = () => {
    const client = useClient()

    const likePic = useCallback(async (imgId: string) => {
        return client.post('/favourites', {
            image_id: imgId
        })
    }, [client])

    return useMutation({
        mutationFn: async (imgId: string) => {
            return likePic(imgId)
        },
        mutationKey: queryKeys.favouriteCat
    })
}

export { useFavouriteCat }
