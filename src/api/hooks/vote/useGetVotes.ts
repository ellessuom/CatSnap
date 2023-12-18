import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "api/queryKeys"
import { useClient } from "api/the-cat-api/useClient"
import { useCallback } from "react"
import { VoteResponse } from '@thatapicompany/thecatapi/dist/types'

export const useGetVotes = () => {
    const client = useClient()

    const getList = useCallback(async () => {
        const { data } = await client.get<VoteResponse[]>(`/votes`)

        return data
    }, [])

    return useQuery({
        queryKey: queryKeys.getVotes,
        queryFn: getList
    })
}