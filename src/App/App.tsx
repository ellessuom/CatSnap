import { useCallback } from 'react'
import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import { ReactComponent as Logo } from 'src/assets/CatSnap_logo.svg'
import { ReactComponent as Add } from 'src/assets/icons/add.svg'
import { useUploadCatPic } from 'src/api/hooks/useUploadCatPic'
import Content from './components/Content'
import classes from './App.module.scss'

function App() {
  const { mutateAsync: upload, isPending, isSuccess } = useUploadCatPic()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles
    const formData = new FormData()
    formData.append('file', file)

    upload(formData)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop,
  })

  return (
    <div className={classes.AppContainer}>
      <header>
        <Logo />
      </header>

      <main className={classNames(classes.Main)}>
        <div className={classes.DragAndDrop}>
          <div
            {...getRootProps()}
            className={classNames(
              classes.DragAndDrop__Dropzone,
              isDragActive && classes.DragActive
            )}
          >
            <input {...getInputProps()} />
            <Add className={classes.DragAndDrop__Img} />
            {isPending ? (
              <p>Uploading...</p>
            ) : (
              <p>
                Drag and drop your picture
                <br />
                or click here to select files
              </p>
            )}
          </div>
        </div>
        <Content refresh={isSuccess} />
      </main>
    </div>
  )
}

export default App
