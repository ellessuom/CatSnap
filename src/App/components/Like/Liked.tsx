import Liked from 'assets/icons/liked.svg?react'
import Unliked from 'assets/icons/unliked.svg?react'
import classes from './Like.module.scss'
import { useState } from 'react'
import { useFavouriteCat } from 'api/hooks/useFavouriteCat'

type Props = {
  liked: boolean
  imgId: string
}

const Like = ({ liked, imgId }: Props) => {
  const [isLiked, setIsLiked] = useState(liked)
  const { mutateAsync: updateLike } = useFavouriteCat()

  const handleClick = async () => {
    await updateLike(imgId)
    setIsLiked((state) => !state)
  }

  // Note: the type UserImageResponse contains `favourite?` which is used here to initialise
  // the Like status, but this value doesn't seem to be returned. Possible workarounds:
  // - pass an account ID to both pic upload and list fetch
  // - retrieve additional info with /favourites/:image_id
  return (
    <button className={classes.Like} onClick={handleClick}>
      {
        isLiked ? <Liked /> : <Unliked />
      }
    </button>
  )
}


export default Like
