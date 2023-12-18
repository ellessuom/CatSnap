import config from 'src/config'

const catToken = process.env.REACT_APP_CAT_TOKEN

type Body = string | FormData

export const useClient = (skipDefaultHeaders?: boolean) => {
  const baseURL = `${config.endpoints.baseCat}/v1`

  const makeRequest = async <T>(url: string, method: string, body?: Body) => {
    let headers: HeadersInit = {
      'x-api-key': catToken ?? 'OHNO',
    }

    // If the body is FormData, let the browser set the Content-Type header
    if (!(body instanceof FormData)) {
      headers = { ...headers, 'Content-Type': 'application/json' }
    }

    const response = await fetch(`${baseURL}${url}`, {
      method,
      headers,
      body: body ?? null,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json() as Promise<T>
  }

  return {
    get: <T>(url: string) => makeRequest<T>(url, 'GET'),
    post: <T>(url: string, body: Body) => makeRequest<T>(url, 'POST', body),
    delete: <T>(url: string) => makeRequest<T>(url, 'DELETE'),
  }
}
