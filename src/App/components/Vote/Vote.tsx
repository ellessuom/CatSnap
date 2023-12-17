import Arrow from 'assets/icons/arrow.svg?react'
import classes from './Vote.module.scss'
import classNames from 'classnames'
import { useVoteCat } from 'api/hooks/useVoteCat'
import { useState } from 'react'

type Props = {
  imgId: string
}

type VoteProps = {
  active: boolean
  onClick: () => void
}

const Upvote = ({ active, onClick }: VoteProps) => {
  const [isActive, setIsActive] = useState(active)
  const handleClick = () => {
    setIsActive((state) => !state)
    onClick()
  }
  
  return (
    <button className={classes.Icon} onClick={handleClick}>
      <Arrow className={classNames(
        classes.Icon__Arrow,
        classes.Icon__Upvote,
        isActive && classes.Active)} />
    </button>
  )
}

const Downvote = ({ active, onClick }: VoteProps) => {
  const [isActive, setIsActive] = useState(active)
  const handleClick = () => {
    setIsActive((state) => !state)
    onClick()
  }
  
  return (
    <button className={classes.Icon} onClick={handleClick}>
      <Arrow className={classNames(
        classes.Icon__Arrow,
        classes.Icon__Downvote,
        isActive && classes.Active)} />
    </button>
  )
}

const Vote = ({ imgId }: Props) => {
  const { mutateAsync: sendVote } = useVoteCat()
  return (
    <div>
      <Upvote active={false} onClick={() => sendVote({ imgId, value: 1 })} />
      <Downvote active={false} onClick={() => sendVote({ imgId, value: -1 })} />
    </div>
  )
}

export default Vote
