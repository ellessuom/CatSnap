import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "api/queryKeys"
import { useClient } from "api/the-cat-api/useClient"
import { useCallback } from "react"
import { FavouriteResponse } from '@thatapicompany/thecatapi/dist/types'

export const useGetFavourites = () => {
    const client = useClient()

    const getList = useCallback(async () => {
        const { data } = await client.get<FavouriteResponse[]>(`/favourites`)

        return data
    }, [])

    return useQuery({
        queryKey: queryKeys.getFavourites,
        queryFn: getList
    })
}