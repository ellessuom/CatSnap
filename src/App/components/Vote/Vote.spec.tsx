import { render, fireEvent, waitFor, screen } from 'src/test-utils'
import Vote from './Vote'
import { useVoteCat } from 'src/api/hooks/vote/useVoteCat'

jest.mock('src/api/hooks/vote/useVoteCat')

describe('Vote', () => {
  const mockedUseVoteCat = useVoteCat as jest.Mock

  beforeEach(() => {
    mockedUseVoteCat.mockReturnValue({ mutateAsync: jest.fn() })
  })

  it('renders the Upvote and Downvote components', () => {
    render(<Vote imgId="123" votes={10} />)
    expect(screen.getByTestId('svg-arrow-up')).toBeInTheDocument()
    expect(screen.getByTestId('svg-arrow-down')).toBeInTheDocument()
  })

  it('displays the correct number of votes', () => {
    render(<Vote imgId="123" votes={10} />)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('calls sendVote with value 1 when upvote is clicked', async () => {
    const sendVoteMock = jest.fn()
    mockedUseVoteCat.mockReturnValue({ mutateAsync: sendVoteMock })

    render(<Vote imgId="123" votes={10} />)
    fireEvent.click(screen.getByTestId('svg-arrow-up'))

    await waitFor(() => {
      expect(sendVoteMock).toHaveBeenCalledWith({ imgId: '123', value: 1 })
    })
  })

  it('calls sendVote with value -1 when downvote is clicked', async () => {
    const sendVoteMock = jest.fn()
    mockedUseVoteCat.mockReturnValue({ mutateAsync: sendVoteMock })

    render(<Vote imgId="123" votes={10} />)
    fireEvent.click(screen.getByTestId('svg-arrow-down'))

    await waitFor(() => {
      expect(sendVoteMock).toHaveBeenCalledWith({ imgId: '123', value: -1 })
    })
  })
})
