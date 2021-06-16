import { useEffect, useRef, useState } from 'react';
import './App.scss';
import SongsListPage from './pages/SongsListPage/SongsListPage'
import Switch from "react-switch"
import dayIcon from './assets/icons/day.png'
import nightIcon from './assets/icons/night.png'

function App() {

  const isInitialThemeDark = localStorage.getItem('is_dark_theme')

  const [isDarkMode, setIsDarkMode] = useState(!!isInitialThemeDark)
  const appRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    toggleDarkMode(isDarkMode)
    localStorage.setItem('is_dark_theme', isDarkMode ? 'true' : '')
  }, [isDarkMode])

  const toggleDarkMode = (isDarkMode: boolean) => {
    if (isDarkMode) {
      appRef?.current?.classList.add('dark')
    } else {
      appRef?.current?.classList.remove('dark')
    }
  }

  const renderNightIcon = () => {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <img src={dayIcon} alt='dark-mode-icon' style={{ width: 20 }}/>
      </div>
    )
  }

  const renderDayIcon = () => {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <img src={nightIcon} alt='light-mode-icon' style={{ width: 20 }}/>
      </div>
    )
  }

  return (
    <div className='App' ref={appRef}>
      <SongsListPage />
      <div className='theme-switch-container'>
        <Switch onChange={() => setIsDarkMode(!isDarkMode)} checked={isDarkMode} checkedIcon={renderDayIcon()} uncheckedIcon={renderNightIcon()} offColor='#18191A' onColor='#dddddd'/>
      </div>
      
    </div>
  );
}

export default App;
