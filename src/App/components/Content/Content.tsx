import { useGetCatsList } from "api/hooks/useGetCatsList"

const Content = () => {
  const { data, isLoading, isError } = useGetCatsList()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong!</p>
  }

  if (!data?.length) {
    return <p>No images yet</p>
  }

  return (
    <ul>
      {
        data.map((img) => (
          <li>{img.url}</li>
        ))
      }
    </ul>
  )
}

export default Content