import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { useClient } from "api/the-cat-api/useClient"

const useUploadCatPic = () => {
    const client = useClient("v1", {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    const uploadPic = useCallback(async (file: FormData) => {
        return client.post('/images/upload', file)
    }, [client])

    return useMutation({
        mutationFn: async (file: FormData) => {
            return uploadPic(file)
        }
    })
}

export { useUploadCatPic }
