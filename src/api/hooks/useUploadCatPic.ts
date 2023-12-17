import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { useClient } from "api/the-cat-api/useClient"
import { queryKeys } from "api/queryKeys"
import config from "config"

const useUploadCatPic = () => {
    const client = useClient("v1", {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    const uploadPic = useCallback(async (file: FormData) => {
        file.append('sub_id', config.consts.CAT_SUB_ID)
        return client.post('/images/upload', file)
    }, [client])

    return useMutation({
        mutationFn: async (file: FormData) => {
            return uploadPic(file)
        },
        mutationKey: queryKeys.uploadCatPic
    })
}

export { useUploadCatPic }
