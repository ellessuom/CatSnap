
import { UserImageResponse } from '@thatapicompany/thecatapi/dist/types'
import Like from '../Like'
import classes from './Footer.module.scss'
import { formatDistance } from 'date-fns'
import Vote from '../Vote'

type Props = {
  img: UserImageResponse
}

const Footer = ({ img }: Props) => {
  return (
    <div className={classes.Footer}>
      <Like liked={Boolean(img.favourite)} imgId={img.id} />
      <p style={{ flex: 1 }}>{formatDistance(new Date(img.created_at), new Date(), { addSuffix: true })}</p>
      <Vote imgId={img.id} />
    </div>
  )
}

export default Footer
