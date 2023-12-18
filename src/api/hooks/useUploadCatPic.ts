import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useClient } from 'src/api/the-cat-api/useClient'
import { queryKeys } from 'src/api/queryKeys'
import config from 'src/config'

const useUploadCatPic = () => {
  const client = useClient(true)

  const uploadPic = useCallback(
    async (file: FormData) => {
      file.append('sub_id', config.consts.CAT_SUB_ID)
      return client.post<FormData>('/images/upload', file)
    },
    [client]
  )

  return useMutation({
    mutationFn: async (file: FormData) => {
      return uploadPic(file)
    },
    mutationKey: queryKeys.uploadCatPic,
  })
}

export { useUploadCatPic }
