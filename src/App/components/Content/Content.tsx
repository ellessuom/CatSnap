import { useEffect, useMemo } from "react"
import { useGetCatsList } from "api/hooks/useGetCatsList"
import classes from './Content.module.scss'
import Footer from "../Footer"
import { useGetFavourites } from "api/hooks/favourite/useGetFavourites"
import { FavouriteResponse } from "@thatapicompany/thecatapi/dist/types"
import keyBy from 'lodash.keyby'
import mapValues from 'lodash.mapvalues'

type Props = {
  refresh: boolean
}

export type FavouritesMapped = {
  [key: string]: Omit<FavouriteResponse, 'image_id'>
}

const Content = ({ refresh }: Props) => {
  const { data, isLoading, isRefetching, isError, refetch } = useGetCatsList()
  const { data: favourites, isLoading: isFavLoading, isError: isFavError } = useGetFavourites()

  const favouritesMapped = useMemo(() => {
    if (favourites?.length) {
      return mapValues(keyBy(favourites, 'image_id'), ({ image_id, ...rest }) => rest) as FavouritesMapped
    }
    return {}
  }, [favourites, data])


  useEffect(() => {
    if (refresh) {
      refetch()
    }
  }, [refresh])

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
    <>
      {isRefetching && <p>Updating...</p>}
      <div className={classes.Content}>
        <ul className={classes.Gallery}>
          {
            data.map((img) => (
              <li key={img.id} className={classes.Gallery__Post}>
                <img src={img.url} alt={`Image with ID ${img.id}`} />

                <Footer img={img} likeId={favouritesMapped[img.id]?.id} />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default Content