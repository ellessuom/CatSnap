import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "api/queryKeys"
import { useClient } from "api/the-cat-api/useClient"
import { useCallback } from "react"
import { Image } from '@thatapicompany/thecatapi/dist/types'

export const useGetCatsList = () => {
    const client = useClient()

    const getList = useCallback(async () => {
        const { data } = await client.get<Image[]>('/images?search')
        return data
    }, [])

    return useQuery({
        queryKey: queryKeys.getCatsList,
        queryFn: getList
    })
}