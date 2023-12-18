import { ReactComponent as Arrow } from 'src/assets/icons/arrow.svg'
import classes from './Vote.module.scss'
import classNames from 'classnames'
import { useVoteCat } from 'src/api/hooks/vote/useVoteCat'
// import { useState } from 'react'

type Props = {
  imgId: string
  votes: number
}

type VoteProps = {
  active: boolean
  onClick: () => void
}

const Upvote = ({ active, onClick }: VoteProps) => {
  // const [isActive, setIsActive] = useState(active)
  const handleClick = () => {
    // setIsActive((state) => !state)
    onClick()
  }

  return (
    <button data-testid="svg-arrow-up" className={classes.Icon} onClick={handleClick}>
      <Arrow
        className={classNames(
          classes.Icon__Arrow,
          classes.Icon__Upvote
          // isActive && classes.Active
        )}
      />
    </button>
  )
}

const Downvote = ({ active, onClick }: VoteProps) => {
  // const [isActive, setIsActive] = useState(active)
  const handleClick = () => {
    // setIsActive((state) => !state)
    onClick()
  }

  return (
    <button data-testid="svg-arrow-down" className={classes.Icon} onClick={handleClick}>
      <Arrow
        className={classNames(
          classes.Icon__Arrow,
          classes.Icon__Downvote
          // isActive && classes.Active
        )}
      />
    </button>
  )
}

const Vote = ({ imgId, votes }: Props) => {
  const { mutateAsync: sendVote } = useVoteCat()
  return (
    <div className={classes.Container}>
      <Upvote active={false} onClick={() => sendVote({ imgId, value: 1 })} />
      <p>{votes}</p>
      <Downvote active={false} onClick={() => sendVote({ imgId, value: -1 })} />
    </div>
  )
}

export default Vote
