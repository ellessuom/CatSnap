import { useEffect } from "react"
import { useGetCatsList } from "api/hooks/useGetCatsList"
import classes from './Content.module.scss'
import Footer from "../Footer"

type Props = {
  refresh: boolean
}

const Content = ({ refresh }: Props) => {
  const { data, isLoading, isRefetching, isError, refetch } = useGetCatsList()

  useEffect(() => {
    if (refresh) {
      refetch()
    }
  }, [refresh])

  if (isLoading || isRefetching) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong!</p>
  }

  if (!data?.length) {
    return <p>No images yet</p>
  }

  return (
    <div className={classes.Content}>
      <ul className={classes.Gallery}>
        {
          data.map((img) => (
            <li key={img.id} className={classes.Gallery__Post}>
              <img src={img.url} alt={`Image with ID ${img.id}`} />

              <Footer img={img} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Content