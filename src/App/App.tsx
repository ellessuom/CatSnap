import { useCallback } from 'react'
import classNames from 'classnames'
import Logo from 'assets/CatSnap_logo.svg?react'
import Add from 'assets/icons/add.svg?react'
import classes from './App.module.scss'
import Content from './components/Content'
import { useDropzone } from 'react-dropzone'
import { useUploadCatPic } from 'api/hooks/useUploadCatPic'


function App() {
  const { mutateAsync: upload, isPending, isSuccess } = useUploadCatPic()
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [file] = acceptedFiles
    const formData = new FormData();
    formData.append('file', file);

    console.log({ file })
    upload(formData)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop
  })

  return (
    <div className={classes.AppContainer}>
      <header>
        <Logo />
        <p>Uploading: {String(isPending)}</p>
      </header>

      <main
        className={classNames(classes.Main)}
      >
        <div className={classes.DragAndDrop}>
          <div
            {...getRootProps()}
            className={classNames(classes.DragAndDrop__Dropzone, isDragActive && classes.DragActive)}>
            <input {...getInputProps()} />
            <Add className={classes.DragAndDrop__Img} />
            {isPending ? (
              <p>Uploading...</p>
            ) : (
              <p>Drag and drop your picture<br />or click here to select files</p>
            )}
          </div>
        </div>
        <Content refresh={isSuccess} />
      </main>
    </div>
  )
}

export default App
