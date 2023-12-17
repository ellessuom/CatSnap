import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "api/queryKeys"
import { useClient } from "api/the-cat-api/useClient"
import { useCallback } from "react"
import { UserImageResponse } from '@thatapicompany/thecatapi/dist/types'
import config from "config"

export const useGetCatsList = () => {
    const client = useClient()

    const getList = useCallback(async () => {
        const { data } = await client.get<UserImageResponse[]>(`/images?limit=${config.consts.GET_CAT_LIST_LIMIT}`)
        return data
    }, [])

    return useQuery({
        queryKey: queryKeys.getCatsList,
        queryFn: getList
    })
}