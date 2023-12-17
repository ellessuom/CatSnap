import { UserImageResponse } from '@thatapicompany/thecatapi/dist/types'
import { formatDistance } from 'date-fns'
import Like from '../Like'
import Vote from '../Vote'
import classes from './Footer.module.scss'

type Props = {
  img: UserImageResponse
  likeId?: number
  votes: number
}

const Footer = ({ img, likeId, votes }: Props) => {
  return (
    <div className={classes.Footer}>
      <Like isLiked={Boolean(likeId)} likeId={likeId} imgId={img.id} />
      <p style={{ flex: 1 }}>{formatDistance(new Date(img.created_at), new Date(), { addSuffix: true })}</p>
      <Vote imgId={img.id} votes={votes} />
    </div>
  )
}

export default Footer
