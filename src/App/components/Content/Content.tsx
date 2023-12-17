import { useEffect } from "react"
import { useGetCatsList } from "api/hooks/useGetCatsList"
import classes from './Content.module.scss'
import Like from "../Like"
import { formatDistance } from 'date-fns'

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

  // Note: the type UserImageResponse contains `favourite?` which is used here to initialise
  // the Like status, but this value doesn't seem to be returned. Possible workarounds:
  // - pass an account ID to both pic upload and list fetch
  // - retrieve additional info with /favourites/:image_id
  return (
    <div className={classes.Content}>
      <ul className={classes.Gallery}>
        {
          data.map((img) => (
            <li key={img.id} className={classes.Gallery__Post}>
              <img src={img.url} alt={`Image with ID ${img.id}`} />
              <div className={classes.Gallery__Post_Footer}>
                <Like liked={Boolean(img.favourite)} imgId={img.id} />
                <p>{formatDistance(new Date(img.created_at), new Date(), { addSuffix: true })}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Content