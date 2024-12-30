import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import TodoForm from './components/TodoForm'
import { Switch } from './components/ui/switch'
import { toggleDarkMode } from './features/darkMode/darkModeSlice'
import { useEffect } from 'react'

function App() {
  let darkMode = useSelector(state => state.darkMode.darkMode)
  const dispatch = useDispatch()

  // actual change in theme
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(darkMode ? 'dark' : 'light')
  }, [darkMode])

  const BackgroundImage = 'https://images.pexels.com/photos/242124/pexels-photo-242124.jpeg'
  return (
    <>
      <div
          className="w-full h-screen bg-cover bg-no-repeat dark:bg-black"
          style={{
              background: `${darkMode ? "linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6))" : "linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3))"},url('${BackgroundImage}') center repeat`,
          }}
      >
        <div className='overflow-y-scroll h-full'>
          <h1 className='text-3xl font-bold underline text-center'>Redux Todo</h1>
          <div className='w-full bg-transparent'>
            <div className='w-full flex justify-end p-5 fixed'>
              <div className='mr-3'> Dark Mode</div>
              <div>
                <Switch onClick={() => dispatch(toggleDarkMode())} className="shadow-md" checked={darkMode} />
              </div>
            </div>
            <TodoForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
