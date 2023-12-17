import { useMemo } from 'react'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import config from 'config'

const catToken: string = import.meta.env.VITE_CAT_TOKEN

export const useClient = (version = 'v1', axiosConfig?: AxiosRequestConfig) => {
    const createInstance = () => {
        const instance = axios.create(axiosConfig ?? {})

        instance.defaults.baseURL = `${config.endpoints.baseCat}/${version}`

        instance.interceptors.request.use((interceptedConfig) => {
            interceptedConfig.headers['x-api-key'] = catToken ?? 'OHNO'

            return interceptedConfig
        })

        return instance
    }

    const client: AxiosInstance = useMemo(createInstance, [axiosConfig, version])
    return client
}
