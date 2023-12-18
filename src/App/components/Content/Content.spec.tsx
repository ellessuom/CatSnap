import { render, screen } from 'src/test-utils'
import Content from './Content'
import { useGetCatsList } from 'src/api/hooks/useGetCatsList'
import { useGetVotes } from 'src/api/hooks/vote/useGetVotes'
import { useGetFavourites } from 'src/api/hooks/favourite/useGetFavourites'
import { getListMapped } from './Content'

jest.mock('src/api/hooks/useGetCatsList')
jest.mock('src/api/hooks/vote/useGetVotes')
jest.mock('src/api/hooks/favourite/useGetFavourites')

describe('Content component', () => {
  const now = new Date()
  const mockCatsList = [
    { id: '1', url: 'cat1.jpg', created_at: now.toISOString() },
    { id: '2', url: 'cat2.jpg', created_at: now.toISOString() },
  ]

  const useGetCatsListMock = useGetCatsList as jest.Mock
  const useGetVotesMock = useGetVotes as jest.Mock
  const useGetFavouritesMock = useGetFavourites as jest.Mock

  beforeEach(() => {
    useGetCatsListMock.mockReturnValue({
      data: mockCatsList,
      isLoading: false,
      isRefetching: false,
      isError: false,
      refetch: jest.fn(),
    })

    useGetFavouritesMock.mockReturnValue({
      data: [{ image_id: '1', id: 'fav1' }],
      isError: false,
    })

    useGetVotesMock.mockReturnValue({
      data: [{ image_id: '1', value: 5 }],
      isError: false,
    })
  })

  it('should render loading state', () => {
    useGetCatsListMock.mockReturnValue({ isLoading: true })
    render(<Content refresh={false} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render error state', () => {
    useGetCatsListMock.mockReturnValue({ isError: true })
    render(<Content refresh={false} />)
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })

  it('should render list of cats', () => {
    render(<Content refresh={false} />)
    const dateTextElements = screen.getAllByText(/less than a minute ago/i)
    expect(dateTextElements).toHaveLength(2)
  })
})

describe('getListMapped', () => {
  it('should correctly map a list of objects', () => {
    const inputList = [
      { image_id: '1', name: 'Cat 1' },
      { image_id: '2', name: 'Cat 2' },
    ]

    const expectedOutput = {
      '1': { name: 'Cat 1' },
      '2': { name: 'Cat 2' },
    }

    const result = getListMapped(inputList)
    expect(result).toEqual(expectedOutput)
  })

  it('should return an empty object for an empty list', () => {
    const inputList: [] = []

    const expectedOutput = {}

    const result = getListMapped(inputList)
    expect(result).toEqual(expectedOutput)
  })

  it('should return an empty object when input is undefined', () => {
    const expectedOutput = {}

    const result = getListMapped(undefined)
    expect(result).toEqual(expectedOutput)
  })
})
