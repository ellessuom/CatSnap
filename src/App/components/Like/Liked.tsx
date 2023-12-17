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

  return (
    <button className={classes.Like} onClick={handleClick}>
      {
        isLiked? <Liked /> : <Unliked />
      }
    </button>
  )
}


export default Like
