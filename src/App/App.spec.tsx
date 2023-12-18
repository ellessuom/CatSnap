import App from './App'
import { render, screen } from 'src/test-utils'

import { useUploadCatPic } from 'src/api/hooks/useUploadCatPic'
import { useDropzone } from 'react-dropzone'

jest.mock('src/api/hooks/useUploadCatPic')
jest.mock('./components/Content')
jest.mock('react-dropzone')

describe('<App />', () => {
  const useUploadCatPicMock = useUploadCatPic as jest.Mock
  const useDropzoneMock = useDropzone as jest.Mock

  beforeEach(() => {
    useUploadCatPicMock.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
      isSuccess: false,
    })

    useDropzoneMock.mockReturnValue({
      getRootProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      isDragActive: false,
    })
  })

  it('displays the drag n drop message', () => {
    useUploadCatPicMock.mockReturnValue({
      mutateAsync: jest.fn(),
    })
    render(<App />)

    expect(screen.getByText(/drag and drop your picture/i)).toBeInTheDocument()
  })

  it('changes text when uploading', () => {
    useUploadCatPicMock.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: true,
      isSuccess: false,
    })

    render(<App />)
    expect(screen.getByText(/uploading.../i)).toBeInTheDocument()
  })

  it('shows active drag state', () => {
    useDropzoneMock.mockReturnValue({
      getRootProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      isDragActive: true,
    })

    render(<App />)
    const textElement = screen.getByText(/drag and drop your picture/i)
    const dropzoneDiv = textElement.parentElement
    expect(dropzoneDiv).toHaveClass('DragActive')
  })

  it('shows content is uploading', async () => {
    const mockUpload = jest.fn()
    useUploadCatPicMock.mockReturnValue({
      mutateAsync: mockUpload,
      isPending: true,
      isSuccess: true,
    })

    render(<App />)
    expect(screen.getByText(/uploading.../i)).toBeInTheDocument()
  })
})
