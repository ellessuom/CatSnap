import { QueryClient  } from "@tanstack/react-query";

const queryClient =  new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false
        }
    }
})

export default queryClient
