import { useCallback, useState } from 'react'
import classNames from 'classnames'
import Logo from 'assets/CatSnap_logo.svg?react'
import Add from 'assets/icons/add.svg?react'
import classes from './App.module.scss'
import Content from './components/Content'

function App() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])


  return (
    <div className={classes.AppContainer}>
      <header>
        <Logo />
      </header>

      <main
        className={classNames(
          classes.Main,
          isDragging && classes.DragStyle
        )}
        onDragEnter={handleDragStart}
        onDragLeave={handleDragEnd}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={classes.DragAndDrop}>
          <Add className={classes.DragAndDrop__Img} />
          <p>Drag and drop your picture<br />or click here to upload</p>
        </div>

        <Content />
      </main>
    </div>
  )
}

export default App
