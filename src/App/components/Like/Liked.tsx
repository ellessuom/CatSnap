import { ReactComponent as Liked } from 'src/assets/icons/liked.svg'
import { ReactComponent as Unliked } from 'src/assets/icons/unliked.svg'
import classes from './Like.module.scss'
import { useFavouriteCat } from 'src/api/hooks/favourite/useLikeCat'
import { useDislikeCat } from 'src/api/hooks/favourite/useDislikeCat'

type Props = {
  isLiked: boolean
  imgId: string
  likeId?: number
}

const Like = ({ isLiked, imgId, likeId }: Props) => {
  const { mutateAsync: sendLike } = useFavouriteCat()
  const { mutateAsync: removeLike } = useDislikeCat()

  const handleClick = async () => {
    if (isLiked && likeId) {
      await removeLike(likeId)
    } else {
      await sendLike(imgId)
    }
  }

  return (
    <button className={classes.Like} onClick={handleClick}>
      {isLiked ? <Liked data-testid="svg-liked" /> : <Unliked data-testid="svg-unliked" />}
    </button>
  )
}

export default Like
