import { useEffect, useMemo } from "react"
import { useGetCatsList } from "api/hooks/useGetCatsList"
import classes from './Content.module.scss'
import Footer from "../Footer"
import { useGetFavourites } from "api/hooks/favourite/useGetFavourites"
import { FavouriteResponse } from "@thatapicompany/thecatapi/dist/types"
import keyBy from 'lodash.keyby'
import mapValues from 'lodash.mapvalues'
import { useGetVotes } from "api/hooks/vote/useGetVotes"

type Props = {
  refresh: boolean
}

type FavouritesMapped = {
  [key: string]: Omit<FavouriteResponse, 'image_id'>
}

type VotesMapped = {
  // imgId : score
  [key: string]: number
}

const getListMapped = <T,K>(list?: T[]) => {
  if (list?.length) {
    return mapValues(keyBy(list, 'image_id'), ({ image_id, ...rest }: { image_id: string }) => rest) as K
  }
  return {} as K
}

const Content = ({ refresh }: Props) => {
  const { data, isLoading, isRefetching, isError, refetch } = useGetCatsList()
  const { data: favourites, isError: isFavError } = useGetFavourites()
  const { data: votes, isError: isVotesError } = useGetVotes()

  const favouritesMapped = useMemo(() => getListMapped<FavouriteResponse, FavouritesMapped>(favourites), [favourites])
  
  const votesMapped = useMemo(() => {
    if (votes?.length) {
      return votes.reduce((output, item) => {
        const { image_id, value } = item
        if (!output[image_id]) {
          output[image_id] = value
        } else {
          output[image_id] += value
        }
        return output
      }, {} as VotesMapped)
    }

    return {}
  }, [votes])

  useEffect(() => {
    if (refresh) {
      refetch()
    }
  }, [refresh])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || isFavError || isVotesError) {
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

                <Footer img={img} likeId={favouritesMapped[img.id]?.id} votes={votesMapped[img.id] ?? 0} />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default Content