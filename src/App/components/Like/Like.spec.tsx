import { render, fireEvent, waitFor, screen } from 'src/test-utils'
import { useFavouriteCat } from 'src/api/hooks/favourite/useLikeCat'
import { useDislikeCat } from 'src/api/hooks/favourite/useDislikeCat'
import Like from './Liked'

jest.mock('src/api/hooks/favourite/useLikeCat')
jest.mock('src/api/hooks/favourite/useDislikeCat')

describe('Like', () => {
  const mockedUseFavouriteCat = useFavouriteCat as jest.Mock
  const mockedUseDislikeCat = useDislikeCat as jest.Mock

  beforeEach(() => {
    mockedUseFavouriteCat.mockReturnValue({ mutateAsync: jest.fn() })
    mockedUseDislikeCat.mockReturnValue({ mutateAsync: jest.fn() })
  })

  it('renders the Liked icon when isLiked is true', () => {
    render(<Like isLiked={true} imgId="123" />)
    expect(screen.getByTestId('svg-liked')).toBeInTheDocument()
  })

  it('renders the Unliked icon when isLiked is false', () => {
    render(<Like isLiked={false} imgId="123" />)
    expect(screen.getByTestId('svg-unliked')).toBeInTheDocument()
  })

  it('calls sendLike when isLiked is false and button is clicked', async () => {
    const sendLikeMock = jest.fn()
    mockedUseFavouriteCat.mockReturnValue({ mutateAsync: sendLikeMock })

    render(<Like isLiked={false} imgId="123" />)
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(sendLikeMock).toHaveBeenCalledWith('123')
    })
  })

  it('calls removeLike when isLiked is true and button is clicked', async () => {
    const removeLikeMock = jest.fn()
    mockedUseDislikeCat.mockReturnValue({ mutateAsync: removeLikeMock })

    render(<Like isLiked={true} imgId="123" likeId={1} />)
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(removeLikeMock).toHaveBeenCalledWith(1)
    })
  })
})
