import Liked from 'assets/icons/liked.svg?react'
import Unliked from 'assets/icons/unliked.svg?react'
import classes from './Like.module.scss'
import { useFavouriteCat } from 'api/hooks/useFavouriteCat'
import { useDeleteFavouriteCat } from 'api/hooks/useDeleteFavouriteCat'

type Props = {
  isLiked: boolean
  imgId: string
  likeId?: number
}

const Like = ({ isLiked, imgId, likeId }: Props) => {
  // const [isActive, setIsActive] = useState(isLiked)
  const { mutateAsync: sendLike } = useFavouriteCat()
  const { mutateAsync: removeLike } = useDeleteFavouriteCat()

  const handleClick = async () => {
    if (isLiked && likeId) {
      await removeLike(likeId)
    } else {
      await sendLike(imgId)
    }
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
